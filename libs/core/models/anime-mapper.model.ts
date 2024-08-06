import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from './anime.model';

/** Type Anime Mapper. */
export type AnimeMapper = {

	/** Mapper method for . */
	fromDto(dto: AnimeDto): Anime;
};
