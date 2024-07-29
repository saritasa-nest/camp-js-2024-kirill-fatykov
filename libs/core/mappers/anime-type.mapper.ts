import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type.model';

/** Anime type from dto mapper. */
export const ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};
