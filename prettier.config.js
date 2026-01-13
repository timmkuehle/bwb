/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 4,
	trailingComma: "none",
	overrides: [
		{
			files: ["*.md", "*.yml", "*.json"],
			options: {
				useTabs: false,
				tabWidth: 2
			}
		}
	]
};
