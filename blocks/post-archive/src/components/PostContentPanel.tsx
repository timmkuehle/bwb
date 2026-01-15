import React from "react";
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	ToggleControl
} from "@wordpress/components";
import { PostContentPanelProps } from "../types";
import usePostContentPanel from "../hooks/usePostContentPanel";
import { __ } from "@wordpress/i18n";

const PostContentPanel: React.FC<PostContentPanelProps> = ({
	attributes,
	setAttributes
}) => {
	const { showPostContent } = attributes;

	const { onChangeShowPostContent, resetAll } =
		usePostContentPanel(setAttributes);

	return (
		<ToolsPanel label={__("Post Content", "bwb")} resetAll={resetAll}>
			<ToolsPanelItem
				label="Display Post Content"
				hasValue={() => showPostContent}
				isShownByDefault={true}
				onDeselect={() => {
					onChangeShowPostContent(false);
				}}
			>
				<ToggleControl
					label={__("Display Post Content", "bwb")}
					checked={showPostContent}
					onChange={onChangeShowPostContent}
					__nextHasNoMarginBottom
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
};

export default PostContentPanel;
