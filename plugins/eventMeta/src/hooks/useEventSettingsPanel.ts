import { useRef, useState, useEffect } from "react";
import __useSelect from "@typed-overrides/__useSelect";

const useEventSettingsPanel = () => {
	const postMeta = __useSelect((select) => {
		return select("core/editor").getEditedPostAttribute("meta");
	}, []);

	const popoverAnchorRef = useRef<HTMLDivElement>();
	const [popoverAnchor, setPopoverAnchor] = useState<HTMLDivElement | null>();

	useEffect(() => {
		if (popoverAnchorRef.current) {
			setPopoverAnchor(popoverAnchorRef.current);
		}
	}, []);

	return { postMeta, popoverAnchorRef, popoverAnchor };
};

export default useEventSettingsPanel;
