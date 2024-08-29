import { AnimeStatus } from './anime-status.model';
import { AnimeType } from './anime-type.model';
import { DateRange } from './date-range.model';

/** Anime domain for frontend's data. */
export type Anime = Readonly<{

	/** Id item. */
	id: number;

	/** Image link. */
	image: string | null;

	/** Anime title in English. */
	titleEng: string;

	/** Anime title in Japanese. */
	titleJpn: string;

	/** Air date. */
	aired: DateRange;

	/** Anime type. */
	type: AnimeType;

	/** Anime status. */
	status: AnimeStatus;
}>;
