import React from "react";
import { __ } from "@wordpress/i18n";
import { BlockEditProps } from "@wordpress/blocks";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, QueryControls, SelectControl } from "@wordpress/components";
import PostPreview from "./PostPreview";
import useEdit from "../hooks/useEdit";
import { PostArchiveAttributes } from "../types";

const Edit: React.FC<BlockEditProps<PostArchiveAttributes>> = ({
	attributes,
	setAttributes
}) => {
	const {
		postType,
		postTypeSelectOptions,
		hasCategories,
		selectedCategories,
		categorySuggestions,
		isResolvingPosts,
		posts,
		onChangePostType,
		onCategoryChange,
		getCategoriesByIds
	} = useEdit(attributes, setAttributes);

	return (
		<section
			{...useBlockProps({
				className: "jkfs-post-archive mnmlst_post-archive"
			})}
		>
			<InspectorControls>
				<PanelBody
					title={__("General settings", "jkfs")}
					initialOpen={true}
				>
					<SelectControl
						label={__("Post Type", "jkfs")}
						help={__(
							"Select the type of content to display: posts, pages, or custom post types.",
							"jkfs"
						)}
						value={postType}
						options={postTypeSelectOptions}
						onChange={onChangePostType}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				{hasCategories && (
					<PanelBody title={__("Filters", "jkfs")}>
						<QueryControls
							selectedCategories={selectedCategories}
							categorySuggestions={categorySuggestions}
							// @ts-expect-error QueryControls is unable to correctly infer the type of the change handler param
							onCategoryChange={onCategoryChange}
						/>
					</PanelBody>
				)}
			</InspectorControls>
			{isResolvingPosts
				? null
				: posts!.map((post) => (
						<PostPreview
							postType={postType}
							post={post}
							getCategoriesByIds={getCategoriesByIds}
						/>
					))}
		</section>
	);
};

export default Edit;
