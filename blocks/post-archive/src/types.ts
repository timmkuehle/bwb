import { MmnlstPost } from "@shared-types/PostTypes";
import { Attachment, Term } from "@wordpress/core-data";

export interface QueryControlsCategory {
	id: number;
	name: string;
	parent: number;
}

export interface PostArchiveAttributes {
	postType: string;
	selectedCategories: QueryControlsCategory[];
}

export interface PostPreviewProps {
	post: MmnlstPost;
	postType: string;
	getCategoriesByIds: (categoryIds: number[]) => Term[] | undefined;
}

export interface FeaturedMediaProps {
	isResolving: boolean;
	media: Attachment | null | undefined;
}

export interface LinkIconProps {
	className?: string;
}
