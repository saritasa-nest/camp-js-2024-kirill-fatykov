import { Injectable } from '@angular/core';

import { AnimeDto, AnimeDtoResults } from '../dtos/anime.dto';
import { AnimeDomain } from '../models/anime-domain.model';

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
				type: stingMapper(result.type),
				status: stingMapper(result.status),
			}
		));
	}
}

/** Change formats Stings.
	* @param string - Value what change.
	*/
function stingMapper(string: string): string {
	const newString = string.split('_').join(' ');
	return newString;
}
