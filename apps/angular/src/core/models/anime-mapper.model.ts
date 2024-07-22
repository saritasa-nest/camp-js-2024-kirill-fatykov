import { AnimeDomain } from './anime-domain.model';
import { AnimeDto } from './anime-dto.model';

/** Type Anime Mapper.*/
export type AnimeMapper = {

	/** Mapper method for Domain. */
	fromDto(dto: AnimeDto): AnimeDomain;
};
