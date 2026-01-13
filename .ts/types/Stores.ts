import { CurriedSelectorsOf, StoreDescriptor } from "@wordpress/data";
import { store as coreStore, Page, Post } from "@wordpress/core-data";
import { store as editorStore } from "@wordpress/editor";
import { store as blockEditorStore } from "@wordpress/editor";
import editorStoreSelectors from "@wordpress/editor";
import { DataRegistry } from "@wordpress/data";
import { PostMeta } from "./PostMeta";

type StoreDescriptorMap = {
	core: typeof coreStore;
	"core/editor": typeof editorStore;
	"core/block-editor": typeof blockEditorStore;
};

export type StoreIdentifier =
	| keyof StoreDescriptorMap
	| "core/data"
	| StoreDescriptor;

export type CurriedSelectorsWithResolversOf<T extends StoreIdentifier> =
	(T extends "core/editor" | typeof editorStore
		? Omit<typeof editorStoreSelectors, "getEditedPostAttribute"> & {
				getEditedPostAttribute: <T extends keyof (Page | Post)>(
					attributeName: T
				) => T extends "meta" ? PostMeta : (Page | Post)[T];
			}
		: T extends "core/data"
			? never
			: CurriedSelectorsOf<
					T extends keyof StoreDescriptorMap
						? StoreDescriptorMap[T]
						: T
				>) & {
		hasFinishedResolution: (
			selectorName: string,
			args: unknown[]
		) => boolean;
		hasStartedResolution: (
			selectorName: string,
			args: unknown[]
		) => boolean;
		isResolving: (selectorName: string, args: unknown[]) => boolean;
	};

export type __SelectFunction = <T extends StoreIdentifier>(
	store: T
) => CurriedSelectorsWithResolversOf<T>;

export type __MapSelect = (
	select: __SelectFunction,
	registry: DataRegistry
) => unknown;

export type __UseSelectReturn<T extends __MapSelect | StoreDescriptor> =
	T extends __MapSelect
		? ReturnType<T>
		: T extends StoreDescriptor
			? CurriedSelectorsWithResolversOf<T>
			: never;
