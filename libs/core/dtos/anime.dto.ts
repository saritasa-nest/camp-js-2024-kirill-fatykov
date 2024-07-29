/* eslint-disable @typescript-eslint/naming-convention */

import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

/** Anime list from API. */
export type AnimeDto = Readonly<{

	/** Id Anime. */
	id: number;

	/** Post creation date. */
	created: string;

	/** Post modification date. */
	modified: string;

	/** Name title in English. */
	title_eng: string;

	/** Name title in Japanese. */
	title_jpn: string;

	/** Image link. */
	image: string | null;

	/** Air date. */
	aired: {

		/** Start air date. */
		start: string | null;

		/** End air date. If null it's still on air. */
		end: string | null;
	};

	/** Anime type. */
	type: AnimeTypeDto;

	/** Anime status. */
	status: AnimeStatusDto;

	/** Overall score Anime. */
	score: number | null;

	/** User score Anime. */
	user_score: number | null;

	/** Numbers of studios. */
	studios: readonly number[];

	/** Genres of Anime. */
	genres: readonly number[];

}>;

/** Pagination info.*/
export type PaginationDto = Readonly<{

	/** Overall count of all Anime in API.*/
	count: number;

	/** Next Anime list.*/
	next: string;

	/** Previous Anime list.*/
	previous: string | null;

	/** Info about Anime.*/
	results: readonly AnimeDto[];
}>;
