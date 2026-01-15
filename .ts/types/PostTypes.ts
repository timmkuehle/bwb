import { Post } from "@wordpress/core-data";
import { PostMeta } from "./PostMeta";

export type MmnlstPost = Omit<Post, "meta"> & {
	class_list: string[];
	meta: PostMeta;
};
