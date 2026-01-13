import { WpMedia } from "./WpMedia";

declare global {
	interface Window {
		wp: {
			media: WpMedia;
		};
	}
	const wp: typeof window.wp;
}
