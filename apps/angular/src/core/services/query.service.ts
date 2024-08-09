import { Injectable } from '@angular/core';
import { AnimeFilters } from '@js-camp/core/models/anime-filters.model';

/** Query Service. */
@Injectable({
	providedIn: 'root',
})
export class QueryService {
	private readonly directionMapper: object = {
		asc: '',
		desc: '-',
	};

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
		if (queries.sort != null) {
			const { active, direction } = queries.sort;
			if (direction !== '') {
				searchParams.append('ordering', `${direction}${active}`);
			} else {
				searchParams.delete('ordering');
			}
		}
		if (queries.select != null) {
			if (queries.select.length !== 0) {
				searchParams.append('type__in', String(queries.select));
			} else {
				searchParams.delete('type__in');
			}
		}

		if (queries.search != null) {
			if (queries.search !== '') {
				searchParams.append('search', String(queries.search));
			} else {
				searchParams.delete('search');
			}
		}
		return searchParams.toString();
	}
}
