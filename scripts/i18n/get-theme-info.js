import colors from "@colors/colors";
import path from "path";
import { readFileSync } from "fs";

const getThemeInfo = () => {
	process.stdout.write(
		`Extracting ${colors.bold.cyan("theme information")} ... `
	);

	try {
		const themeInfo = readFileSync(
			path.resolve(process.cwd(), "style.css"),
			"utf-8"
		);

		const textDomain = themeInfo
			.match(/Text Domain:\s.*(\n|$)/)?.[0]
			.replace(/Text Domain:\s/, "")
			.replace(/\n$/, "");

		if (!textDomain) {
			throw new Error(
				`Text domain not set in ${path.resolve(process.cwd(), "style.css")}`
			);
		}

		console.log(colors.bold.green("Success\n"));

		return {
			textDomain,
			author: themeInfo
				.match(/Author:\s.*(\n|$)/)?.[0]
				.replace(/Author:\s/, "")
				.replace(/\n$/, ""),
			authorUri: themeInfo
				.match(/Author URI:\s.*(\n|$)/)?.[0]
				.replace(/Author URI:\s/, "")
				.replace(/\n$/, "")
		};
	} catch (err) {
		console.log(colors.bold.red("Failed"));
		console.error(err, "\n");

		process.exit(1);
	}
};

export default getThemeInfo;
