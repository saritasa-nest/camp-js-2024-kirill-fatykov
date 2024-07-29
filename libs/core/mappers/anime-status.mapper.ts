import { AnimeStatus } from '../models/anime-status.model';
import { AnimeStatusDto } from '../dtos/anime-status.dto';

/** Anime status from dto mapper. */
export const ANIME_STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
