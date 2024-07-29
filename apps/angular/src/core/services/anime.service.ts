import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeDomain } from '@js-camp/core/models/anime-domain.model';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

/** HTTPS requests. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private http: HttpClient = inject(HttpClient);

	private animeMapper: AnimeMapper = inject(AnimeMapper);

	/** Get JSON from API. */
	public getAnime(): Observable<AnimeDomain[]> {
		return this.http.get<AnimeDto>('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/', {
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Api-Key': 'c43958c3-a449-40ea-a4e1-4aa46a3f4ad6',
			},
		}).pipe(map(dto => this.animeMapper.fromAnimeDto(dto)));
	}
}
