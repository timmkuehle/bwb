import React from "react";
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	ToggleControl,
	RangeControl
} from "@wordpress/components";
import { PostContentPanelProps } from "../types";
import usePostContentPanel from "../hooks/usePostContentPanel";
import { __ } from "@wordpress/i18n";

const PostContentPanel: React.FC<PostContentPanelProps> = ({
	attributes,
	setAttributes
}) => {
	const { showPostContent, postContentLength } = attributes;

	const {
		onChangeShowPostContent,
		resetShowPostContent,
		onChangePostContentLength,
		postContentLengthHasChanged,
		resetPostContentLength,
		resetAll
	} = usePostContentPanel(attributes, setAttributes);

	return (
		<ToolsPanel label={__("Post Content", "bwb")} resetAll={resetAll}>
			<ToolsPanelItem
				label="Display Post Content"
				hasValue={() => showPostContent}
				isShownByDefault={true}
				onDeselect={resetShowPostContent}
			>
				<ToggleControl
					label={__("Display Post Content", "bwb")}
					checked={showPostContent}
					onChange={onChangeShowPostContent}
					__nextHasNoMarginBottom
				/>
			</ToolsPanelItem>
			{showPostContent && (
				<ToolsPanelItem
					label={__("Content length", "bwb")}
					hasValue={postContentLengthHasChanged}
					isShownByDefault={true}
					onDeselect={resetPostContentLength}
				>
					<RangeControl
						label={__("Max number of words", "bwb")}
						value={postContentLength}
						checked={showPostContent}
						onChange={onChangePostContentLength}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</ToolsPanelItem>
			)}
		</ToolsPanel>
	);
};

export default PostContentPanel;
