import __useSelect from "@typed-overrides/__useSelect";

const usePostPreview = (
	classList: string[],
	postType: string,
	featuredMediaId?: number,
	renderedExcerpt?: string
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

	const sanitizedExcerpt =
		renderedExcerpt !== ""
			? renderedExcerpt?.replace(/<\/?[A-z0-9]+>|\n/g, "")
			: null;

	return {
		wrapperClassName,
		isResolvingFeaturedMedia,
		featuredMedia,
		sanitizedExcerpt
	};
};

export default usePostPreview;
