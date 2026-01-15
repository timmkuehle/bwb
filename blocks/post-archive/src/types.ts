import {
	JkfsCategory,
	JkfsCustomer,
	JkfsPartner,
	JkfsPost
} from "@shared-types/PostTypes";
import { Attachment } from "@wordpress/core-data";

export interface PostArchiveAttributes {
	postType: string;
	selectedCategories: JkfsCategory[];
}

export interface PostPreviewProps {
	post: JkfsPost | JkfsPartner | JkfsCustomer;
	postType: string;
	getCategoriesByIds: (categoryIds: number[]) => JkfsCategory[] | undefined;
}

export interface FeaturedMediaProps {
	isResolving: boolean;
	media: Attachment | null | undefined;
}

export interface LinkIconProps {
	className?: string;
}
