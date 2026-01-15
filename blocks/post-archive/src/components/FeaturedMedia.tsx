import React from "react";
import { FeaturedMediaProps } from "../types";
import useFeaturedMedia from "../hooks/useFeaturedMedia";
import { Spinner } from "@wordpress/components";

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({
	isResolving,
	media
}) => {
	if (!isResolving && !media) return null;

	if (isResolving) {
		return (
			<figure className="mnmlst_thumbnail-figure is-resolving">
				<Spinner />
			</figure>
		);
	}

	const { imgAttributes } = useFeaturedMedia(media!);

	return (
		<figure className="mnmlst_thumbnail-figure">
			<img {...imgAttributes} />
		</figure>
	);
};

export default FeaturedMedia;
