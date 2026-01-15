import { decodeEntities } from "@wordpress/html-entities";
import __useSelect from "@typed-overrides/__useSelect";

const usePostPreview = (
	classList: string[],
	postType: string,
	postContentLength: number,
	excerpt: string,
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

	const excerptWords = decodeEntities(excerpt)
		.replace(/<\/?[A-z0-9]+>|\n/g, "")
		.split(" ");

	const truncatedExcerpt =
		excerptWords.length > postContentLength
			? excerptWords.slice(0, postContentLength).join(" ") + " […]"
			: excerptWords.join(" ");

	return {
		wrapperClassName,
		isResolvingFeaturedMedia,
		featuredMedia,
		truncatedExcerpt
	};
};

export default usePostPreview;
