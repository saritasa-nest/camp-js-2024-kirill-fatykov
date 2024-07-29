import { Injectable } from '@angular/core';

import { AnimeDto, AnimeDtoResults } from '../dtos/anime.dto';
import { AnimeDomain } from '../models/anime-domain.model';

import { ANIME_TYPE_FROM_DTO } from './anime-type.mapper';
import { ANIME_STATUS_FROM_DTO } from './anime-status.mapper';

/** Service for mapping date.*/
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {

	/** Method from Dto to Domain.
		* @param dto - Data from API.
		*/
	public fromAnimeDto(dto: AnimeDto): AnimeDomain[] {
		return dto.results.map((result: AnimeDtoResults): AnimeDomain => (
			{
				image: result.image,
				titleEng: result.title_eng,
				titleJpn: result.title_jpn,
				aired: {
					start: result.aired.start,
				},
				type: ANIME_TYPE_FROM_DTO[result.type],
				status: ANIME_STATUS_FROM_DTO[result.status],
			}
		));
	}
}
