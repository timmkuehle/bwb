import { useSelect } from "@wordpress/data";
import { __MapSelect, __UseSelectReturn } from "@shared-types/Stores";
import { MapSelect } from "@wordpress/data";

const __useSelect = <T extends __MapSelect>(mapSelect: T, deps: unknown[]) =>
	useSelect(mapSelect as unknown as MapSelect, deps) as __UseSelectReturn<T>;

export default __useSelect;
