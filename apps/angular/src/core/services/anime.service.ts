import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

/** Yeah. */
@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private http: HttpClient = inject(HttpClient);

	/** Yeah. */
	public getAnime(): Object {
		return this.http.get('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/', {
			headers: {
				'Api-Key': 'c43958c3-a449-40ea-a4e1-4aa46a3f4ad6',
			},
		}).subscribe(res => {
			console.log('Response status:', res);
		});
	}
}
