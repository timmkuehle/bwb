import { registerBlockType } from "@wordpress/blocks";
import { _x } from "@wordpress/i18n";
import { loop } from "@wordpress/icons";
import metadata from "../block.json";
import Edit from "./components/Edit";
import { PostArchiveAttributes } from "./types";

registerBlockType<PostArchiveAttributes>(metadata.name, {
	...metadata,
	title: _x("MNMLST Post Archive", "block title", "jkfs"),
	description: _x(
		"An advanced block that allows displaying post types based on different query parameters.",
		"block description",
		"jkfs"
	),
	icon: loop,
	attributes: {
		postType: {
			type: "string",
			default: "post"
		},
		selectedCategories: {
			type: "array",
			default: []
		},
		numberOfItems: {
			type: "number",
			default: 5
		}
	},
	edit: Edit
});
