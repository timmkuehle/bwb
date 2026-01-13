import path from "path";
import { glob } from "glob";
import fs from "fs";
import colors from "@colors/colors";

/**
 * @class
 * @constructor
 * @public
 */
export default class CleanOutputWebpackPlugin {
	/**
	 * The name of the webpack plugin
	 *
	 * @public
	 */
	PLUGIN_NAME = "CleanOutputWebpackPlugin";
	/**
	 * Glop pattern of files to remove after build, relative to webpack output directory
	 *
	 * @private
	 */
	_pattern;
	/**
	 * Sets the moment in the build process, when the files should be deleted
	 *
	 * @private
	 */
	_cleanAt;

	/**
	 * Constructor
	 *
	 * @param {object} options CleanOutputWebpackPlugin options aobject
	 * @param {string} options.pattern Glop pattern of files to remove after build, relative to webpack output directory
	 * @param {"beforeEmit" | "afterEmit"} [options.cleanAt] Sets the moment in the build process, when the files should be deleted
	 */
	constructor(options) {
		this._pattern = options.pattern;
		this._cleanAt = options.cleanAt || "afterEmit";
	}

	/**
	 * This method is applied during Transpiliation
	 *
	 * @param {import('webpack').Compiler} compiler
	 */
	apply(compiler) {
		const logger = compiler.getInfrastructureLogger(this.PLUGIN_NAME);

		compiler.hooks.beforeRun.tap(this.PLUGIN_NAME, () => {
			if (this._cleanAt !== "beforeEmit") return;

			this._deleteFiles(compiler.options.output.path, logger);
		});

		compiler.hooks.done.tap(this.PLUGIN_NAME, () => {
			if (this._cleanAt !== "afterEmit") return;

			this._deleteFiles(compiler.options.output.path, logger);
		});
	}

	/**
	 * Delete all files mathing the provided glob pattern
	 *
	 * @param {string | undefined} outputPath The output path of the compilation
	 * @param {ReturnType<import('webpack').Compiler["getInfrastructureLogger"]>} logger A webpack logger instance
	 */
	_deleteFiles(outputPath, logger) {
		glob.sync(path.resolve(outputPath || process.cwd(), this._pattern)).map(
			(path) => {
				const isDir = fs.statSync(path).isDirectory();

				const baseLog = `Deleting ${isDir ? "directory" : "file"} ${colors.yellow.bold(
					path.replace(process.cwd(), ".")
				)}`;

				try {
					fs.rmSync(path, { recursive: true });

					logger.info(
						`${baseLog} ... ${colors.bold.green("Success")}`
					);
				} catch (e) {
					logger.error(`${baseLog} ... ${colors.red.bold("Failed")}`);

					if (
						typeof e === "object" &&
						e !== null &&
						"message" in e &&
						typeof e.message === "string"
					) {
						logger.error(e.message);
					}
				}
			}
		);

		process.stdout.write("\n");
	}
}
