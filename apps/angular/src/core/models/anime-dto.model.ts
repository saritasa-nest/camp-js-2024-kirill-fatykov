/* eslint-disable @typescript-eslint/naming-convention */
/** Array of objects with anime info.*/
export type AnimeDtoResults = {

	/** Id Anime.*/
	readonly id: number;

	/** Post creation date.*/
	readonly created: string;

	/** Post modification date.*/
	readonly modified: string;

	/** Name title in English.*/
	readonly title_eng: string;

	/** Name title in Japanese.*/
	readonly title_jpn: string;

	/** Image link.*/
	readonly image: string;

	/** Air date.*/
	readonly aired: {

		/** Start air date.*/
		readonly start: string;

		/** End air date. If null it's still on air.*/
		readonly end: string | null;
	};

	/** Anime type.*/
	readonly type: string;

	/** Anime status.*/
	readonly status: string;

	/** Overall score Anime.*/
	readonly score: number | null;

	/** User score Anime.*/
	readonly user_score: number | null;

	/** Numbers of studios.*/
	readonly studios: number[];

	/** Genres of Anime.*/
	readonly genres: number[];

};

/** All JSON doc from API.*/
export type AnimeDto = {

	/** Overall count of all Anime in API.*/
	readonly count: number;

	/** Next 25 Anime.*/
	readonly next: string;

	/** Previous 25 Anime.*/
	readonly previous: string | null;

	/** Info about Anime.*/
	readonly results: AnimeDtoResults[];
};
