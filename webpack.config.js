import path from "path";
import { glob } from "glob";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import DependencyExtractionWebpackPlugin from "@wordpress/dependency-extraction-webpack-plugin";
import CleanOutputWebpackPlugin from "./scripts/clean-output-webpack-plugin/index.js";

/** @type {(entryType: 'public' | 'admin' | 'style' | 'plugin' | 'block') => import('webpack').Configuration['output']} */
const output = (entryType) => ({
	path: path.resolve(
		entryType === "plugin"
			? "./plugins"
			: entryType === "block"
				? "./blocks"
				: "./assets/dist"
	),
	filename: `[name]${entryType === "style" ? ".style" : ""}.js`
});

/** @type {(entryType: 'public' | 'admin' | 'style' | 'plugin' | 'block') => import('webpack').Configuration['module']} */
const module = (entryType) => ({
	rules: [
		entryType !== "style" && {
			test: /\.(j|t)sx?$/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@wordpress/babel-preset-default"],
					plugins: ["admin", "plugin", "block"].includes(entryType)
						? ["@automattic/babel-plugin-preserve-i18n"]
						: []
				}
			}
		},
		["style", "plugin", "block"].includes(entryType) && {
			test: /\.s{0,1}(a|c)ss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath:
							"/wp-content/themes/mnmlst-child/assets/resources/"
					}
				},
				"css-loader",
				"sass-loader"
			]
		},
		entryType === "style" && {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+(\.\d)*)?$/,
			include: path.resolve("assets/resources/fonts/"),
			type: "asset/resource",
			generator: {
				filename: "fonts/[name][ext]",
				emit: false
			}
		}
	].filter((module) => module !== false)
});

/** @type {import('webpack').Configuration['resolve']} */
const resolve = {
	extensions: [".js", ".jsx", ".ts", ".tsx"],
	alias: {
		"@shared-types": path.resolve(".ts", "types"),
		"@typed-overrides": path.resolve(".ts", "overrides"),
		"@fonts": path.resolve("assets", "resources", "fonts"),
		"@resources": path.resolve("assets", "resources")
	}
};

/** @type {(test: 'public' | 'admin' | 'style' | 'plugin' | 'block') => import('webpack').Configuration['plugins']} */
const plugins = (entryType) =>
	[
		["style", "plugin", "block"].includes(entryType) &&
			new MiniCssExtractPlugin(),
		new DependencyExtractionWebpackPlugin({}),
		["style", "plugin", "block"].includes(entryType) &&
			new CleanOutputWebpackPlugin({
				pattern:
					entryType === "style" ? "*.style.{js,js.map}" : "**/dist",
				cleanAt: entryType === "style" ? "afterEmit" : "beforeEmit"
			}),
		["plugin", "block"].includes(entryType) &&
			new CleanOutputWebpackPlugin({
				pattern: "**/dist/{editorStyle,style}.{js,js.map}",
				cleanAt: "afterEmit"
			})
	].filter((plugin) => plugin !== false);

/** @type {import('webpack').Configuration} */
const publicConfig = {
	entry: glob
		.sync("./assets/src/scripts/public/index.{js,jsx,ts,tsx}")
		.reduce(
			(_entry, path) => ({
				public: `./${path}`
			}),
			{}
		),
	output: output("public"),
	module: module("public"),
	resolve,
	plugins: plugins("public")
};

/** @type {import('webpack').Configuration} */
const adminConfig = {
	entry: glob.sync("./assets/src/scripts/admin/index.{js,jsx,ts,tsx}").reduce(
		(_entry, path) => ({
			admin: `./${path}`
		}),
		{}
	),
	output: output("admin"),
	module: module("admin"),
	resolve,
	plugins: plugins("admin")
};

/** @type {import('webpack').Configuration} */
const styleConfig = {
	entry: glob
		.sync("./assets/src/styles/{public,admin}.{sass,scss,css}")
		.reduce(
			/** @param {{[name: string]: string}} entry */ (
				entry,
				filePath
			) => ({
				...entry,
				[path.parse(filePath).name]: `./${filePath}`
			}),
			{}
		),
	output: output("style"),
	module: module("style"),
	resolve,
	plugins: plugins("style")
};

/** @type {import('webpack').Configuration} */
const pluginConfig = {
	entry: glob
		.sync([
			"./plugins/**/src/index.{js,jsx,ts,tsx}",
			"./plugins/**/src/style.{scss,sass,css}"
		])
		.reduce(
			/** @param {{[name: string]: string}} entry */ (entry, path) => {
				const pathFraments = path.split("/");
				const pluginName = pathFraments[1];
				const filename = (pathFraments.at(-1) || "").replace(
					/\.(j|t)sx?|\.s?(c|a)ss$/,
					""
				);
				entry[`${pluginName}/dist/${filename}`] = "./" + path;
				return entry;
			},
			{}
		),
	output: output("plugin"),
	module: module("plugin"),
	resolve,
	plugins: plugins("plugin")
};

/** @type {import('webpack').Configuration} */
const blockConfig = {
	entry: glob
		.sync([
			"./blocks/**/src/{index,script,viewScript}.{js,jsx,ts,tsx}",
			"./blocks/**/src/{editorStyle,style}.{scss,sass,css}"
		])
		.reduce(
			/** @param {{[name: string]: string}} entry */ (entry, path) => {
				const pathFraments = path.split("/");
				const blockName = pathFraments[1];
				const filename = (
					/index\.(j|t)sx?/.test(pathFraments.at(-1) || "")
						? "editorScript"
						: pathFraments.at(-1) || ""
				).replace(/\.(j|t)sx?|\.s?(c|a)ss$/, "");
				entry[`${blockName}/dist/${filename}`] = "./" + path;
				return entry;
			},
			{}
		),
	output: output("block"),
	module: module("block"),
	resolve,
	plugins: plugins("block")
};

/** @type {(_env: any, argv: Record<string, any> & {mode: "production" | "development"}) => import('webpack').Configuration[]} */
export default (_env, argv) => {
	const devtoolConfig = {
		devtool: argv.mode === "development" ? "source-map" : undefined
	};

	return [publicConfig, adminConfig, styleConfig, pluginConfig, blockConfig]
		.filter(
			(config) =>
				typeof config.entry !== "object" ||
				Object.keys(config.entry).length > 0
		)
		.map((config) => ({ ...config, ...devtoolConfig }));
};
