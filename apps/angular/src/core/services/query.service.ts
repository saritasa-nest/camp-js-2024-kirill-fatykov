import { Injectable } from '@angular/core';
import { AnimeFilters } from '@js-camp/core/models/anime-filters.model';

/** Query Service. */
@Injectable({
	providedIn: 'root',
})
export class QueryService {
	/**
	 * Method for filtering a queries to the server.
	 * @param queries Object with queries.
	 */
	public filter(queries: AnimeFilters): string {
		const searchParams = new URLSearchParams();

		if (queries.paginator != null) {
			const { pageIndex, pageSize } = queries.paginator;
			searchParams.append('limit', String(pageSize));
			searchParams.append('offset', String(pageIndex * pageSize));
		}
		if (queries.sort != null && queries.sort.direction !== '') {
			const { active } = queries.sort;
			let { direction } = queries.sort;
			direction = direction === 'asc' ? '' : '-';
			searchParams.append('ordering', `${direction}${active}`);
		}
		if (queries.select != null && queries.select.length !== 0) {
			searchParams.append('type__in', String(queries.select));
		}

		if (queries.search != null && queries.search !== '') {
			searchParams.append('search', String(queries.search));
		}
		return searchParams.toString();
	}
}
