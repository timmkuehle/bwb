import colors from "@colors/colors";
import path from "path";
import { glob } from "glob";
import { rmSync } from "fs";
import { execSync } from "child_process";
import getWpCliVersion from "#scriptUtils/get-wp-cli-version.js";
import getTextDomain from "./get-theme-info.js";

if (!getWpCliVersion()) {
	console.error(
		colors.red(
			"WP-CLI is not installed, or not working properly. Install or reinstall WP-CLI and try again.\n"
		)
	);

	process.exit(1);
}

const jsonFiles = glob.sync(path.resolve(process.cwd(), "languages", "*.json"));

if (jsonFiles.length > 0) {
	console.log(colors.bold.cyan("Deleting existing translation files:"));

	jsonFiles.map((file) => {
		process.stdout.write(
			`Deleting ${colors.bold.yellow(path.basename(file))} ... `
		);

		try {
			rmSync(file);

			console.log(colors.bold.green("Success"));
		} catch (err) {
			console.log(colors.bold.red("Failed"));
			console.error(err);
		}
	});

	process.stdout.write("\n");
}

const { textDomain } = getTextDomain();

const poFiles = glob.sync(
	path.resolve(process.cwd(), "languages", `${textDomain}-??_??.po`)
);

if (poFiles.length === 0) {
	console.log(
		colors.red(
			`No ${colors.bold("PO files")} for ${colors.bold("JS translations")} found. ` +
				`Create a ${colors.bold("PO file")} for at least one locale, ` +
				`run the ${colors.bold("i18n-extract")} script and try again.\n`
		)
	);

	process.exit(1);
}

poFiles.forEach((poFilepath) => {
	const relPoFilepath = `.${poFilepath.replace(process.cwd(), "")}`;

	process.stdout.write(
		`Making ${colors.bold.cyan("JSON files")} ` +
			`from ${colors.bold.cyan(relPoFilepath)} ... `
	);

	try {
		execSync(`wp i18n make-json ${poFilepath} --no-purge`, {
			stdio: ["pipe", "pipe", "pipe"]
		});

		console.log(colors.bold.green("Success\n"));
	} catch (err) {
		console.log(colors.bold.red("Failed"));
		console.error(err, "\n");
	}
});
