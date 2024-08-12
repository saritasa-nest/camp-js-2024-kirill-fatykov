import { AnimeStatus } from './anime-status.model';
import { AnimeType } from './anime-type.model';
import { DateRange } from './date-range.model';

/** Anime domain for frontend's data. */
export type Anime = Readonly<{

	/** Image link. */
	image: string | null;

	/** Name title in English. */
	titleEng: string;

	/** Name title in Japanese. */
	titleJpn: string;

	/** Air date. */
	aired: DateRange;

	/** Anime type. */
	type: AnimeType;

	/** Anime status. */
	status: AnimeStatus;
}>;
