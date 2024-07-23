import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AnimeDto } from '../models/anime-dto.model';

import { AnimeMapper } from './anime-mapper.service';

/** HTTPS requests. */
@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private http: HttpClient = inject(HttpClient);

	private animeMapper: AnimeMapper = inject(AnimeMapper);

	/** Get JSON from API. */
	public getAnime(): Observable<AnimeDto> {
		return this.http.get<AnimeDto>('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/', {
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Api-Key': 'c43958c3-a449-40ea-a4e1-4aa46a3f4ad6',
			},
		});
	}
}
