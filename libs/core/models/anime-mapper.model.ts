import { AnimeDomain } from './anime-domain.model';
import { AnimeDto } from '../dtos/anime.dto';

/** Type Anime Mapper.*/
export type AnimeMapper = {

	/** Mapper method for Domain. */
	fromDto(dto: AnimeDto): AnimeDomain;
};
