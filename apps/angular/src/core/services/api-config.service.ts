import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Api config. */
@Injectable({
	providedIn: 'root',
})
export class ApiConfig {

	/** Api url. */
	public readonly apiUrl = environment.apiUrl;

	/** Api key. */
	public readonly apiKey = environment.apiKey;
}
