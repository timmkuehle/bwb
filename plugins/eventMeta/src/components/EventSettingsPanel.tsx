import React from "react";
import {
	Button,
	Dropdown,
	DateTimePicker,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import useEventSettingsPanel from "../hooks/useEventSettingsPanel";

const EventSettingsPanel: React.FC = () => {
	const { postMeta, popoverAnchorRef, popoverAnchor } =
		useEventSettingsPanel();

	console.log(postMeta);

	const comp = (
		<div
			className="components-popover components-dropdown__content editor-post-schedule__dialog is-positioned"
			data-wp-c16t="true"
			data-wp-component="Popover"
			aria-label="Veröffentlichungsdatum ändern"
			tabIndex={-1}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				opacity: 1,
				transform: "translateX(660px) translateY(238px)",
				transformOrigin: "100% 0% 0px"
			}}
		></div>
	);

	return (
		<HStack className="editor-post-panel__row" ref={popoverAnchorRef}>
			<div className="editor-post-panel__row-label">
				{__("Start of Event", "bwb")}
			</div>
			<div className="editor-post-panel__row-control">
				<Dropdown
					contentClassName="editor-post-schedule__dialog"
					focusOnMount={true}
					popoverProps={{
						placement: "left-start",
						anchor: popoverAnchor,
						offset: 36,
						shift: true,
						flip: true
					}}
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							variant="tertiary"
							onClick={onToggle}
							aria-expanded={isOpen}
						>
							{postMeta?.["_mnmlst_event_start_datetime"]}
						</Button>
					)}
					renderContent={() => (
						<VStack>
							<DateTimePicker />
						</VStack>
					)}
				></Dropdown>
			</div>
		</HStack>
	);
};

export default EventSettingsPanel;
