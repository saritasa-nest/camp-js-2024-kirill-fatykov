import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimePagination } from '@js-camp/core/models/anime-pagination.model';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { ApiConfig } from './api-config.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private animeMapper: AnimeMapper = inject(AnimeMapper);

	private animeConfig = inject(ApiConfig);

	/**
		* Fetch anime list from an API.
		* @param queryString - Query string.
		* */
	public getList(queryString: string | null = ''): Observable<AnimePagination<Anime>> {
		return this.http.get<PaginationDto<AnimeDto>>(`${this.animeConfig.apiUrl}/anime/anime/?${queryString}`)
			.pipe(map(dto => this.animeMapper.fromAnimeDto(dto)));
	}
}
