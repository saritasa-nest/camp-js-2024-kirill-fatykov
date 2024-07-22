import { Injectable } from '@angular/core';

import { AnimeDto, AnimeDtoResults } from '../models/anime-dto.model';
import { AnimeDomain } from '../models/anime-domain.model';

/** */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {

	/**
		* @param dto - D.
		*/
	public fromAnimeDto(dto: AnimeDto): AnimeDomain[] {
		return dto.results.map((result: AnimeDtoResults): AnimeDomain => {
			{
				image: result.image,
				titleEng: result.title_eng,
				titleJpn: result.title_jpn,
				aired: {
					start: result.aired.start,
				},
				type: result.type,
				status: result.status,
			};
		});
	}
}
