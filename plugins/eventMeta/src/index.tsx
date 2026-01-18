import { registerPlugin } from "@wordpress/plugins";
import { PluginPostStatusInfo } from "@wordpress/editor";
import EventSettingsPanel from "./components/EventSettingsPanel";

registerPlugin("mnmlst-plugin-event-meta", {
	render: () => {
		return (
			<PluginPostStatusInfo className="components-flex components-h-stack editor-post-panel__row">
				<EventSettingsPanel />
			</PluginPostStatusInfo>
		);
	}
});
