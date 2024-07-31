import { Injectable } from '@angular/core';

import { AnimeDto, PaginationDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime.model';

import { ANIME_TYPE_FROM_DTO } from './anime-type.mapper';
import { ANIME_STATUS_FROM_DTO } from './anime-status.mapper';

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {

	/**
		* Method from Dto to model.
		* @param dto - Data from API.
		*/
	public fromAnimeDto(dto: PaginationDto): Anime[] {
		return dto.results.map((result: AnimeDto): Anime => (
			{
				image: result.image,
				titleEng: result.title_eng,
				titleJpn: result.title_jpn,
				aired: {
					start: result.aired.start,
					end: result.aired.end,
				},
				type: ANIME_TYPE_FROM_DTO[result.type],
				status: ANIME_STATUS_FROM_DTO[result.status],
			}
		));
	}
}
