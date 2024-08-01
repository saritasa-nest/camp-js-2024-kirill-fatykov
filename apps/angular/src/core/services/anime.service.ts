import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimePagination } from '@js-camp/core/models/anime-pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { ApiConfig } from './api-config.service';

/** HTTPS requests. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private http: HttpClient = inject(HttpClient);

	private animeMapper: AnimeMapper = inject(AnimeMapper);

	private animeConfig = inject(ApiConfig);

	/** Get anime list from API. */
	public getList(limit = '25', offset = '0'): Observable<AnimePagination<Anime>> {
		return this.http.get<PaginationDto<AnimeDto>>(`${this.animeConfig.apiUrl}/anime/anime/?limit=${limit}&offset=${offset}`)
			.pipe(map(dto => this.animeMapper.fromAnimeDto(dto)));
	}
}
