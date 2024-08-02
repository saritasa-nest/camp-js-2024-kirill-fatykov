import { Observable, map } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimePagination } from '@js-camp/core/models/anime-pagination.model';
import { QueryService } from '@js-camp/angular/core/services/query.service';
import { AnimeEvents } from '@js-camp/core/models/anime-events.model';

import { ReplaceEmptyStringPipe } from '../features/replaceEmptyString.pipe';

/** Table with Anime list. */
@Component({
	selector: 'anime-table',
	styleUrls: ['../../theme/typography.css', './anime-table.component.css'],
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		AsyncPipe,
		DatePipe,
		ReplaceEmptyStringPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	private animeService = inject(AnimeService);

	private filter = inject(QueryService).filter;

	private results = signal<AnimeEvents>({});

	// eslint-disable-next-line rxjs/finnish
	private results$ = toObservable(this.results)
		.pipe(
			map(item => this.filter(item)),
		);

	/** Variable where stored anime info. */
	public animeList$: Observable<AnimePagination<Anime>>;

	/** Anime length. */
	public animeLength = signal(0);

	/** Search Value. */
	public searchValue = '';

	/** Type list. */
	public toppingList: string[] = ['TV', 'OVA', 'MOVIE', 'SPECIAL', 'ONA', 'MUSIC', 'PROMOTIONAL_VIDEOS', 'UNKNOWN'];

	/** Show first and last buttons in paginator. */
	public showFirstLastButtons = true;

	public constructor() {
		this.animeList$ = this.animeService.getList();
		this.results$.subscribe(item => this.animeService.getList(item));
	}

	/**
		* Handle paginator event.
		* @param paginatorEvent  - Event. */
	public handlePaginatorEvent(paginatorEvent: PageEvent): void {
		this.results.set({ ...this.results(), paginator: { pageIndex: paginatorEvent.pageIndex, pageSize: paginatorEvent.pageSize } });
	}

	/**
		* Announce the change in sort state.
		* @param sortState - Sort state.
		* */
	public sortChangeAnime(sortState: Sort): void {
		this.results.set({ ...this.results(), sort: sortState });
	}

	// /** A. */
	// public searchAnime(): void {
	// 	console.log(this.searchValue);
	// }

	// /** A. */
	// public selectChange(): void {

	// }

	/** Name columns for table module. */
	public displayedColumns = ['image', 'title_eng', 'title_jpn', 'aired__startswith', 'type', 'status'] as const;

}
