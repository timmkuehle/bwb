import __useSelect from "@typed-overrides/__useSelect";

const usePostPreview = (
	classList: string[],
	postType: string,
	featuredMediaId?: number
) => {
	const wrapperClassName = [...classList, "mnmlst_post-wrapper"].join(" ");

	const { isResolvingFeaturedMedia, featuredMedia } = __useSelect(
		(select) => {
			const { hasFinishedResolution, getMedia } = select("core");

			return {
				isResolvingFeaturedMedia: featuredMediaId
					? !hasFinishedResolution("getMedia", [featuredMediaId])
					: false,
				featuredMedia: featuredMediaId
					? getMedia(featuredMediaId)
					: null
			};
		},
		[postType]
	);

	return { wrapperClassName, isResolvingFeaturedMedia, featuredMedia };
};

export default usePostPreview;
