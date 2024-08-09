import { Injectable } from '@angular/core';
import { AnimeFilters } from '@js-camp/core/models/anime-filters.model';

/** Query Service. */
@Injectable({
	providedIn: 'root',
})
export class QueryService {
	/**
	 * Query filter.
	 * @param object Object with queries.
	 */
	public filter(object: AnimeFilters): string {
		const result: string[] = [];

		const entiresEvents = Object.entries(object);

		entiresEvents.forEach(([key, value]) => {
			switch (key) {
				case 'paginator': {
					const [pageIndex, pageSize] = Object.values(value);
					result.push(`limit=${pageSize}&offset=${pageIndex * pageSize}`);
					break;
				}

				case 'sort': {
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

				case 'search': {
					if (value === '') {
						result.push('');
						break;
					}
					result.push(`search=${value}`);
					break;
				}

				case 'select': {
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
