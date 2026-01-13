import colors from "@colors/colors";
import path from "path";
import { glob } from "glob";
import { execSync } from "child_process";
import { existsSync, copyFileSync, statSync, rmSync } from "fs";
import { HEADERS, JS_HEADERS } from "./constants.js";
import getWpCliVersion from "#scriptUtils/get-wp-cli-version.js";
import runWebpack from "#scriptUtils/run-webpack.js";
import getTextDomain from "./get-theme-info.js";

if (!getWpCliVersion()) {
	console.error(
		colors.red(
			"WP-CLI is not installed, or not working properly. Install or reinstall WP-CLI and try again.\n"
		)
	);

	process.exit(1);
}

const poFiles = glob.sync(`${path.resolve("languages")}/??_??.po`);

if (poFiles.length === 0) {
	console.log(
		colors.red(
			`No ${colors.bold("PO files")} found. ` +
				`Create a ${colors.bold("PO file")} for at least one locale, and try again.\n`
		)
	);

	process.exit(1);
}

const { textDomain, author, authorUri } = getTextDomain();

try {
	await runWebpack(
		"development",
		"Bundling JS files for translation extraction"
	);
} catch (err) {
	console.error(err);

	process.exit(1);
} finally {
	process.stdout.write("\n");
}

const potFilepath = path.resolve(process.cwd(), "languages", "mnmlst.pot");
const jsPotFilepath = path.resolve(process.cwd(), "languages", "mnmlst-js.pot");

const languageTeamInfo = {
	"Language-Team": author
		? author + (authorUri ? ` <${authorUri}>` : "")
		: undefined
};

try {
	process.stdout.write(
		`Extracting translations into ${colors.bold.cyan("POT file")} at ${colors.bold.cyan(potFilepath.replace(process.cwd(), "."))} ... `
	);

	execSync(
		`wp i18n make-pot ./ ${potFilepath} --domain="${textDomain}" --exclude="vendor" --skip-js --skip-block-json --skip-audit --headers='${JSON.stringify({ ...languageTeamInfo, ...HEADERS })}'`,
		{ stdio: ["pipe", "pipe", "pipe"] }
	);

	console.log(colors.bold.green("Success"));
} catch (err) {
	console.log(colors.bold.red("Failed\n"));
	console.error(err);

	process.exit(1);
}

try {
	process.stdout.write(
		`Extracting ${colors.bold.cyan("JavaScript")} translations into ${colors.bold.cyan("JS POT file")} at ${colors.bold.cyan(jsPotFilepath.replace(process.cwd(), "."))} ... `
	);

	execSync(
		`wp i18n make-pot ./ ${jsPotFilepath} --domain="${textDomain}" --exclude="node_modules,scripts,assets/src,blocks/**/src,plugins/**/src" --skip-php --skip-block-json --skip-audit --headers='${JSON.stringify({ ...languageTeamInfo, ...JS_HEADERS })}'`,
		{ stdio: ["pipe", "pipe", "pipe"] }
	);

	console.log(colors.bold.green("Success\n"));
} catch (err) {
	console.log(colors.bold.red("Failed\n"));
	console.error(err);

	process.exit(1);
}

poFiles.forEach((poFilepath) => {
	const relPoFilepath = poFilepath.replace(process.cwd(), "");

	process.stdout.write(
		`Merging ${colors.bold.cyan("POT file")} into ${colors.bold.cyan(`.${relPoFilepath}`)} ...`
	);

	try {
		if (statSync(poFilepath).size == 0) {
			copyFileSync(potFilepath, poFilepath);
		} else {
			execSync(`wp i18n update-po ${potFilepath} ${poFilepath}`, {
				stdio: ["pipe", "pipe", "pipe"]
			});
		}

		console.log(colors.bold.green("Success"));
	} catch (err) {
		console.log(colors.bold.red("Failed"));
		console.error(err);
	}

	const relMoFilepath = relPoFilepath.replace(/\.po$/, ".mo");

	process.stdout.write(
		`Making ${colors.bold.cyan(`MO file .${relMoFilepath}`)} ... `
	);

	try {
		execSync(`wp i18n make-mo ${poFilepath} `, {
			stdio: ["pipe", "pipe", "pipe"]
		});

		console.log(colors.bold.green("Success"));
	} catch (err) {
		console.log(colors.bold.red("Failed"));
		console.error(err);
	} finally {
		process.stdout.write("\n");
	}

	const relJsPoFilepath =
		"languages/" +
		poFilepath
			.replace(process.cwd(), "")
			.replace(/^\/?languages\//, `${textDomain}-`);

	const jsPoFilepath = path.resolve(process.cwd(), relJsPoFilepath);

	if (existsSync(jsPoFilepath)) {
		process.stdout.write(
			`Merging ${colors.bold.cyan("JS POT file")} into ${colors.bold.cyan(`./${relJsPoFilepath}`)} ... `
		);

		try {
			execSync(`wp i18n update-po ${jsPotFilepath} ${jsPoFilepath}`, {
				stdio: ["pipe", "pipe", "pipe"]
			});

			console.log(colors.bold.green("Success"));
		} catch (err) {
			console.log(colors.bold.red("Failed"));
			console.error(err);
		}
	} else {
		process.stdout.write(
			`Creating ${colors.bold.cyan(`JS PO file ./${relJsPoFilepath}`)} ... `
		);

		try {
			copyFileSync(jsPotFilepath, jsPoFilepath);

			console.log(colors.bold.green("Success"));
		} catch (err) {
			console.log(colors.bold.red("Failed"));
			console.error(err);
		}
	}

	const relJsMoFilepath = relJsPoFilepath.replace(/\.po$/, ".mo");

	process.stdout.write(
		`Making ${colors.bold.cyan(`JS MO file ./${relJsMoFilepath}`)} ... `
	);

	try {
		execSync(`wp i18n make-mo ${jsPoFilepath} `, {
			stdio: ["pipe", "pipe", "pipe"]
		});

		console.log(colors.bold.green("Success"));
	} catch (err) {
		console.log(colors.bold.red("Failed"));
		console.error(err);
	} finally {
		process.stdout.write("\n");
	}
});

process.stdout.write(`Deleting ${colors.bold.cyan("POT files")} ... `);

try {
	rmSync(potFilepath);
	rmSync(jsPotFilepath);

	console.log(colors.bold.green("Success"));
} catch (err) {
	console.log(colors.bold.red("Failed"));
	console.error(err);
} finally {
	process.stdout.write("\n");
}
