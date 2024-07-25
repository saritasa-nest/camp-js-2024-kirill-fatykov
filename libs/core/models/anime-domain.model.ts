/** Anime domain for frontend's data.*/
export type AnimeDomain = {

	/** Image link.*/
	readonly image: string;

	/** Name title in English.*/
	readonly titleEng: string;

	/** Name title in Japanese.*/
	readonly titleJpn: string;

	/** Air date.*/
	aired: {

		/** Start air date.*/
		readonly start: string;
	};

	/** Anime type.*/
	readonly type: string;

	/** Anime status.*/
	readonly status: string;
};
