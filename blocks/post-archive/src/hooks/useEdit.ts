import __useSelect from "@typed-overrides/__useSelect";
import { useState, useEffect } from "@wordpress/element";
import { MmnlstPost } from "@shared-types/PostTypes";
import { PostArchiveAttributes, QueryControlsCategory } from "../types";
import { Type, Term } from "@wordpress/core-data";

const useEdit = (
	attributes: PostArchiveAttributes,
	setAttributes: (attrs: Partial<PostArchiveAttributes>) => void
) => {
	const { postType, selectedCategories, numberOfItems } = attributes;

	const { isResolvingPostTypes, postTypes } = __useSelect((select) => {
		const { hasFinishedResolution, getPostTypes } = select("core");

		const isResolvingPostTypes = !hasFinishedResolution("getPostTypes", [
			{ per_page: -1 }
		]);

		const postTypes = getPostTypes({ per_page: -1 });

		return {
			isResolvingPostTypes,
			postTypes: postTypes?.filter(
				(postType) =>
					postType.viewable &&
					!["page", "attachment"].includes(postType.slug)
			)
		};
	}, []);

	const postTypeSelectOptions = isResolvingPostTypes
		? undefined
		: postTypes!.map((postType) => ({
				label: postType.name,
				value: postType.slug
			}));

	const onChangePostType = (newPostType: string) => {
		setAttributes({ postType: newPostType });
	};

	const [postTypeProps, setPostTypeProps] = useState<Type>();

	useEffect(() => {
		if (isResolvingPostTypes) return;

		setPostTypeProps(postTypes!.filter((pt) => pt.slug === postType)[0]);
	}, [isResolvingPostTypes, postTypes, postType]);

	const postTypeSupportsCategories = postTypeProps
		? postTypeProps.taxonomies.includes("category")
		: false;

	const { isResolvingCategories, categories } = __useSelect(
		(select) => {
			const { hasFinishedResolution, getEntityRecords } = select("core");

			if (isResolvingPostTypes || !postTypeSupportsCategories) {
				return {
					isResolvingCategories: false,
					categories: null
				};
			}

			const query = {
				per_page: -1,
				context: "view"
			};

			return {
				isResolvingCategories: !hasFinishedResolution(
					"getEntityRecords",
					["taxonomy", "category", query]
				),
				categories: getEntityRecords(
					"taxonomy",
					"category",
					query
				) as Term[]
			};
		},
		[isResolvingPostTypes, postTypeSupportsCategories]
	);

	const hasCategories =
		postTypeSupportsCategories &&
		!isResolvingCategories &&
		categories!.length > 0;

	const categorySuggestions = hasCategories
		? categories!.reduce<Record<string, QueryControlsCategory>>(
				(prevCat, curCat) => ({
					...prevCat,
					[curCat.name]: {
						id: curCat.id,
						name: curCat.name,
						parent: curCat.parent ?? 0
					}
				}),
				{}
			)
		: undefined;

	const onCategoryChange = (
		categories: (string | { id: number; value: string })[]
	) => {
		if (!categorySuggestions) return;

		setAttributes({
			selectedCategories: categories
				.map((cat) =>
					typeof cat === "string"
						? (categorySuggestions[cat] as unknown as
								| QueryControlsCategory
								| undefined)
						: categorySuggestions[cat.value]
				)
				.filter((cat) => cat !== undefined)
		});
	};

	const onNumberOfItemsChange = (newNumber: number | undefined) => {
		setAttributes({
			numberOfItems: newNumber === 0 ? -1 : (newNumber ?? 0)
		});
	};

	const getCategoriesByIds = (categoryIds: number[]) => {
		if (!hasCategories) return undefined;

		return categories!.filter((category) =>
			categoryIds.includes(category.id)
		);
	};

	const { isResolvingPosts, posts } = __useSelect(
		(select) => {
			const { hasFinishedResolution, getEntityRecords } = select("core");

			const query = {
				post_type: postType,
				...(selectedCategories.length > 0 && {
					categories: selectedCategories.map(
						(selectedCategory) => selectedCategory.id
					)
				}),
				per_page: numberOfItems
			};

			return {
				isResolvingPosts: !hasFinishedResolution("getEntityRecords", [
					"postType",
					postType,
					query
				]),
				posts: getEntityRecords(
					"postType",
					postType,
					query
				) as unknown as MmnlstPost[] | null
			};
		},
		[postType, selectedCategories, numberOfItems]
	);

	return {
		postType,
		isResolvingPostTypes,
		postTypeSelectOptions,
		hasCategories,
		selectedCategories,
		categorySuggestions,
		numberOfItems,
		onNumberOfItemsChange,
		isResolvingPosts,
		posts,
		onChangePostType,
		onCategoryChange,
		getCategoriesByIds
	};
};

export default useEdit;
