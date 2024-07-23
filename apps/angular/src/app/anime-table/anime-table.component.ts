/* eslint-disable jsdoc/require-jsdoc */
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AnimeDomain } from '@js-camp/angular/core/models/anime-domain.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';

export type PeriodicElement = {
	name: string;
	position: number;
	weight: number;
	symbol: string;
};

@Component({
	selector: 'anime-table',
	styleUrl: 'anime-table.component.css',
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [MatTableModule, AsyncPipe],
})
export class AnimeTableComponent {
	public animeAll$: Observable<AnimeDomain[]>;

	private animeService = inject(AnimeService);

	public constructor() {
		this.animeAll$ = this.animeService.getAnime();
	}

	public displayedColumns: string[] = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'];

}
