import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiConfig } from '../services/api-config.service';

/**
	* Interceptor add header.
	* @param req Outgoing HttpRequest.
	* @param next Function representing the next processing step in the interceptor chain.
	*/
export function headerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const animeKey = inject(ApiConfig).apiKey;

	const reqWithHeader = req.clone({
		headers: req.headers.set('Api-Key', animeKey),
	});
	return next(reqWithHeader);
}
