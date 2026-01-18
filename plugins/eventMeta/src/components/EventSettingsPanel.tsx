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
