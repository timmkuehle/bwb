import React from "react";
import { PostPreviewProps } from "../types";
import usePostPreview from "../hooks/usePostPreview";
import FeaturedMedia from "./FeaturedMedia";
import LinkIcon from "./LinkIcon";
import { __ } from "@wordpress/i18n";

const PostPreview: React.FC<PostPreviewProps> = ({
	post,
	postType,
	getCategoriesByIds
}) => {
	const { id, class_list, title, excerpt, meta } = post;

	const {
		wrapperClassName,
		isResolvingFeaturedMedia,
		featuredMedia,
		sanitizedExcerpt
	} = usePostPreview(
		class_list,
		postType,
		meta?._mnmlst_featured_media.id,
		excerpt.rendered
	);

	const categories = getCategoriesByIds(
		"categories" in post ? post.categories : []
	);

	return (
		<article id={`post-${id.toString()}`} className={wrapperClassName}>
			<header className="mnmlst_entry-header">
				<FeaturedMedia
					isResolving={isResolvingFeaturedMedia}
					media={featuredMedia}
				/>
				<h3 className="mnmlst_post-title">{title.raw}</h3>
				{categories && (
					<div className="mnmlst_post-categories">
						{categories.map((category) => (
							<div
								className={`mnmlst_post-category ${category.slug}`}
							>
								{category.name}
							</div>
						))}
					</div>
				)}
			</header>
			<div className="mnmlst_entry-content">
				{sanitizedExcerpt !== null && (
					<p className="mnmlst_post-excerpt">{sanitizedExcerpt}</p>
				)}
			</div>
			<footer className="mnmlst_entry-footer">
				<a className="mnmlst_post-link">
					<span>{__("Learn more", "bwb")}</span>
					<LinkIcon className="mnmlst_post-link-icon" />
				</a>
			</footer>
		</article>
	);
};

export default PostPreview;
