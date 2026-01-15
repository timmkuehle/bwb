import { PostArchiveAttributes } from "../types";

const usePostContentPanel = (
	attributes: PostArchiveAttributes,
	setAttributes: (attrs: Partial<PostArchiveAttributes>) => void
) => {
	const { postContentLength } = attributes;

	const onChangeShowPostContent = (showPostContent: boolean) => {
		setAttributes({ showPostContent });
	};

	const resetShowPostContent = () => {
		setAttributes({ showPostContent: false });
	};

	const onChangePostContentLength = (postContentLength?: number) => {
		setAttributes({ postContentLength: postContentLength || 20 });
	};

	const postContentLengthHasChanged = () => postContentLength !== 30;

	const resetPostContentLength = () => {
		setAttributes({ postContentLength: 30 });
	};

	const resetAll = () => {
		resetShowPostContent();
		resetPostContentLength();
	};

	return {
		onChangeShowPostContent,
		resetShowPostContent,
		onChangePostContentLength,
		postContentLengthHasChanged,
		resetPostContentLength,
		resetAll
	};
};

export default usePostContentPanel;
