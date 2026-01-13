export interface MnmlstFeaturedMediaLinkVideo {
	active: boolean;
	id: number;
	type: "internal" | "embedded";
	embed_code: string;
}

export interface MnmlstFeaturedMediaSettings {
	autoplay: boolean;
	fullscreen_player: boolean;
	link_video: MnmlstFeaturedMediaLinkVideo;
	loop: boolean;
	muted: boolean;
	playsinline: boolean;
	poster: number;
	preload: "auto" | "metadata" | "none";
}

export interface MnmlstFeaturedMedia {
	id: number;
	settings: MnmlstFeaturedMediaSettings;
}

export type PostMeta =
	| (Record<string, string> & {
			_mnmlst_featured_media: MnmlstFeaturedMedia;
	  })
	| undefined;
