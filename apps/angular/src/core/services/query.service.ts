import { Injectable } from '@angular/core';
import { AnimeEvents } from '@js-camp/core/models/anime-events.model';

/** Query Service. */
@Injectable({
	providedIn: 'root',
})
export class QueryService {

	/**
		* Filter.
		* @param object - Object.
		*/
	public filter(object: AnimeEvents): string {
		const result: string[] = [];

		if (isEmptyObject(object)) {
			return '';
		}

		const entiresEvents = Object.entries(object);

		entiresEvents.forEach(([key, value]) => {
			if (key === 'paginator') {
				const [pageIndex, pageSize] = Object.values(value);
				result.push(`limit=${pageSize}&offset=${pageIndex * pageSize}`);
			}

			if (key === 'sort') {
				let [active, direction] = Object.values(value);
				active = direction === '' ? '' : active;
				direction = direction === 'asc' ? '' : '-';
				result.push(`ordering=${direction}${active}`);
			}

		});
		return result.join('&');
	}

}

/**
	* Check empty object.
	* @param value - Object.
	*/
function isEmptyObject(value: object): boolean {
	return Object.keys(value).length === 0;
}
