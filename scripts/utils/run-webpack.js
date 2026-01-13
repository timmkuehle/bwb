import colors from "@colors/colors";
import webpack from "webpack";
import webpackConfig from "../../webpack.config.js";
import { muteStdout, unmuteStdout } from "./mute-stdout.js";

const webpackEnv = { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true };
const webpackArgv = { env: webpackEnv };

/** @type {import("webpack").Configuration["infrastructureLogging"]} */
const infrastructureLogging = {
	level: "none"
};

/**
 * Creates a new webpack bundle
 *
 * @param {"development" | "production"} mode The mode to run webpack in
 * @param {string} message The process message to print to the console
 * @returns {Promise<void>}
 */
const runWebpack = (mode, message) => {
	muteStdout();

	return new Promise((resolve, reject) => {
		webpack(
			webpackConfig(webpackEnv, { ...webpackArgv, mode }).map(
				(config) => ({
					...config,
					mode,
					infrastructureLogging
				})
			),
			(err, stats) => {
				unmuteStdout();

				process.stdout.write(`${message} ... `);

				if (err) {
					console.log(colors.bold.red("Failed"));
					reject(err);
					return;
				}

				if (stats?.hasErrors()) {
					console.log(colors.bold.red("Failed"));
					reject(
						new Error(
							stats
								.toJson()
								.errors?.reduce(
									/**
									 * @param {string[]} errorMessages
									 * @param {import("webpack").StatsError} currentError
									 * @returns {string[]}
									 */
									(errorMessages, currentError) => {
										const test = [
											...errorMessages,
											currentError.message
										];

										return test;
									},
									[]
								)
								.join("\n")
						)
					);
					return;
				}

				console.log(colors.bold.green("Success"));
				resolve();
			}
		);
	});
};

export default runWebpack;
