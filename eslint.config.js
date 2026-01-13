import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nodeJsFiles = [
	"eslint.config.js",
	"prettier.config.js",
	"webpack.config.js",
	"scripts/**/*"
];

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.strictTypeChecked,
	eslintConfigPrettier,
	{
		ignores: [
			"assets/dist/**/*",
			"plugins/**/dist/**/*",
			"blocks/**/dist/**/*"
		]
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname
			}
		},
		plugins: { prettier: eslintPluginPrettier },
		rules: {
			"prettier/prettier": "warn",
			"no-undef": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unnecessary-type-arguments": "warn"
		}
	},
	{
		ignores: nodeJsFiles,
		languageOptions: {
			globals: { ...globals.browser, wp: "readonly" },
			parserOptions: {
				ecmaFeatures: { jsx: true }
			}
		}
	},
	{ files: nodeJsFiles, languageOptions: { globals: globals.node } },
	{
		files: ["plugins/**/src/**/*"],
		extends: [
			eslintPluginReact.configs.flat.recommended,
			eslintPluginReact.configs.flat["jsx-runtime"],
			eslintPluginReactHooks.configs.flat.recommended
		],
		settings: { react: { version: "detect" } },
		rules: {
			"react/jsx-filename-extension": [
				"error",
				{ extensions: [".jsx", ".tsx"] }
			]
		}
	}
);
