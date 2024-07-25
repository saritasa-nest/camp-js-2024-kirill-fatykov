import { AnimeDto } from '../dtos/anime.dto';

import { AnimeDomain } from './anime-domain.model';

/** Type Anime Mapper.*/
export type AnimeMapper = {

	/** Mapper method for Domain. */
	fromDto(dto: AnimeDto): AnimeDomain;
};
