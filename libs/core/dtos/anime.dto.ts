/* eslint-disable @typescript-eslint/naming-convention */

import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

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
	readonly image: string | null;

	/** Air date.*/
	readonly aired: {

		/** Start air date.*/
		readonly start: string | null;

		/** End air date. If null it's still on air.*/
		readonly end: string | null;
	};

	/** Anime type.*/
	readonly type: AnimeTypeDto;

	/** Anime status.*/
	readonly status: AnimeStatusDto;

	/** Overall score Anime.*/
	readonly score: number | null;

	/** User score Anime.*/
	readonly user_score: number | null;

	/** Numbers of studios.*/
	readonly studios: readonly number[];

	/** Genres of Anime.*/
	readonly genres: readonly number[];

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
	readonly results: readonly AnimeDtoResults[];
};
