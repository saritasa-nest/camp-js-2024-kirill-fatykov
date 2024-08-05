import { Injectable } from '@angular/core';
import { AnimeEvents } from '@js-camp/core/models/anime-events.model';

/** Query Service. */
@Injectable({
	providedIn: 'root',
})
export class QueryService {

	/**
		* Filter.
		* @param object - Object with events.
		*/
	public filter(object: AnimeEvents): string {
		const result: string[] = [];

		const entiresEvents = Object.entries(object);

		entiresEvents.forEach(([key, value]) => {
			switch (key) {
				case ('paginator'): {
					const [pageIndex, pageSize] = Object.values(value);
					result.push(`limit=${pageSize}&offset=${pageIndex * pageSize}`);
					break;
				}

				case ('sort'): {
					let [, direction] = Object.values(value);
					const [active] = Object.values(value);

					if (direction === '') {
						result.push('');
						break;
					}

					direction = direction === 'asc' ? '' : '-';
					result.push(`ordering=${direction}${active}`);
					break;
				}

				case ('search'): {
					if (value === '') {
						result.push('');
						break;
					}
					result.push(`search=${value}`);
					break;
				}

				case ('select'): {
					if (Object.values(value).length === 0) {
						result.push('');
						break;
					}
					result.push(`type__in=${value}`);
					break;
				}
				default:
					result.push('');
			}
		});
		return result.filter(item => item !== '').join('&');
	}

}

// /**
// 	* Check empty object.
// 	* @param value - Object.
// 	*/
// function isEmptyObject(value: object): boolean {
// 	return Object.keys(value).length === 0;
// }
