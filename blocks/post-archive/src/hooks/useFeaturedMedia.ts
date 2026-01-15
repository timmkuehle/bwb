import { ImgHTMLAttributes } from "react";
import { Attachment } from "@wordpress/core-data";

const useFeaturedMedia = (media: Attachment) => {
	const { media_details, source_url, mime_type } = media;
	const { width, height, sizes } = media_details;

	const srcSet =
		mime_type === "image/svg+xml"
			? undefined
			: Object.values(sizes)
					.map(
						(size) => `${size.source_url} ${size.width.toString()}w`
					)
					.join(", ");

	const imgAttributes: ImgHTMLAttributes<HTMLImageElement> = {
		width,
		height,
		src: source_url,
		className: "attachment-post-thumbnail size-post-thumbnail",
		decoding: "async",
		fetchPriority: "auto",
		srcSet: srcSet,
		sizes: `(max-width: ${width.toString()}px) 100vw, ${width.toString()}px`
	};

	return { imgAttributes };
};

export default useFeaturedMedia;
