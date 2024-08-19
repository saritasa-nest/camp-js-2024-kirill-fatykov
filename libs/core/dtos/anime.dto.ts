import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { DateRangeDto } from './date-range.dto';

/** Anime list from API. */
export type AnimeDto = Readonly<{

	/** Id Anime. */
	id: number;

	/** Post creation date. Example: 2024-07-17T06:10:09.161962Z. */
	created: string;

	/** Post modification date. Example:2024-07-17T06:10:09.161962Z. */
	modified: string;

	/** Name title in English. */
	title_eng: string;

	/** Name title in Japanese. */
	title_jpn: string;

	/** Image link. */
	image: string | null;

	/** Air date. */
	aired: DateRangeDto;

	/** Anime type. */
	type: AnimeTypeDto;

	/** Anime status. */
	status: AnimeStatusDto;

	/** Overall score Anime. */
	score: number | null;

	/** User score Anime. */
	user_score: number | null;

	/** List of studios. */
	studios: readonly number[];

	/** Genres of Anime. */
	genres: readonly number[];

}>;
