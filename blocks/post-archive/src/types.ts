import { MmnlstPost } from "@shared-types/PostTypes";
import { Attachment, Term } from "@wordpress/core-data";

export interface QueryControlsCategory {
	id: number;
	name: string;
	parent: number;
}

export interface PostArchiveAttributes {
	postType: string;
	showPostContent: boolean;
	selectedCategories: QueryControlsCategory[];
	numberOfItems: number;
	postContentLength: number;
}

export interface PostContentPanelProps {
	attributes: PostArchiveAttributes;
	setAttributes: (attrs: Partial<PostArchiveAttributes>) => void;
}

export interface PostPreviewProps {
	post: MmnlstPost;
	postType: string;
	getCategoriesByIds: (categoryIds: number[]) => Term[] | undefined;
	showPostContent: boolean;
	postContentLength: number;
}

export interface FeaturedMediaProps {
	isResolving: boolean;
	media: Attachment | null | undefined;
}

export interface LinkIconProps {
	className?: string;
}
