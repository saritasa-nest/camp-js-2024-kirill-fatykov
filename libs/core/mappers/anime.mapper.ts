import { Injectable } from '@angular/core';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime.model';
import { PaginationDto } from '../dtos/pagination.dto';
import { AnimePagination } from '../models/anime-pagination.model';

import { ANIME_TYPE_FROM_DTO } from './anime-type.mapper';
import { ANIME_STATUS_FROM_DTO } from './anime-status.mapper';

/** Service for mapping date. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {
	/**
	 * Method from Dto to model.
	 * @param dto Data from API.
	 */
	public fromAnimeDto(dto: PaginationDto<AnimeDto>): AnimePagination<Anime> {
		return {
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(
				(result: AnimeDto): Anime => ({
					image: result.image,
					titleEng: result.title_eng,
					titleJpn: result.title_jpn,
					aired: {
						start: result.aired.start,
						end: result.aired.end,
					},
					type: ANIME_TYPE_FROM_DTO[result.type],
					status: ANIME_STATUS_FROM_DTO[result.status],
				}),
			),
		};
	}
}
