import { Injectable } from '@angular/core';

import { AnimeDto, AnimeDtoResults } from '../models/anime-dto.model';
import { AnimeDomain } from '../models/anime-domain.model';

/** */
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
					start: dateMapper(result.aired.start),
				},
				type: stingMapper(result.type),
				status: stingMapper(result.status),
			}
		));
	}
}

/** Change format for Dates.
	* @param date - Value what change.
	*/
function dateMapper(date: string): string {
	const regex = /(\d{4})-(\d{2})-(\d{2})/m;
	const [, year, month, day] = date?.match(regex) ?? [];
	return `${day || '00'}.${month || '00'}.${year || '0000'}`;
}

/** Change formats Stings.
	* @param string - Value what change.
	*/
function stingMapper(string: string): string {
	const newString = string.split('_').join(' ');
	return newString;
}
