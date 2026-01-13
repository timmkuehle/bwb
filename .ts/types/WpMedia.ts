export interface AttachmentAttributes {
	id: number;
	url: string;
	title: string;
	filename?: string;
	mime?: string;
	type?: string;
}

export interface Attachment {
	attributes: AttachmentAttributes;
}

export interface UploaderFilters {
	max_file_size: string;
	mime_types: { extensions: string }[] & { regexp: RegExp };
	prevent_duplicates: boolean;
}

export interface UploaderSettings {
	container: HTMLDivElement;
}

export interface Uploader {
	getOption(option: "filters"): UploaderFilters;
	setOption(
		option: "filters",
		value: Omit<UploaderFilters, "mime_types"> & {
			mime_types: { extensions: string }[];
		}
	): void;
	settings: UploaderSettings;
}

export interface MediaFrameOptions {
	title?: string;
	button?: { title: string };
	library?: { type?: string | string[] };
	multiple?: boolean;
}

export interface MediaFrameState {
	get(key: "selection"): {
		first: () => { toJSON: () => AttachmentAttributes };
		set: (attachments: Attachment[]) => void;
		add: (attachments: Attachment[]) => void;
	};
	get(key: "library"): {
		props: {
			attributes: {
				type?: string;
			};
		};
	};
}

export interface MediaFrame {
	open: () => void;
	close?: () => void;
	on: (
		event: "open" | "select" | "uploader:ready",
		callback: () => void
	) => void;
	state: () => MediaFrameState | undefined;
	uploader: { uploader?: { uploader: Uploader } };
}

export type WpMedia = {
	attachment: (id: number) => Attachment | undefined;
} & ((options: MediaFrameOptions) => MediaFrame);
