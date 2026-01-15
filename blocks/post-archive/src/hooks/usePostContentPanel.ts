import { PostArchiveAttributes } from "../types";

const usePostContentPanel = (
	setAttributes: (attrs: Partial<PostArchiveAttributes>) => void
) => {
	const onChangeShowPostContent = (showPostContent: boolean) => {
		setAttributes({ showPostContent });
	};

	const resetAll = () => {
		setAttributes({ showPostContent: false });
	};

	return {
		onChangeShowPostContent,
		resetAll
	};
};

export default usePostContentPanel;
