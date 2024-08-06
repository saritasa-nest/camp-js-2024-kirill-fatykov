import { Observable, map, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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

	private results$ = toObservable(this.results)
		.pipe(
			map(item => this.filter(item)),
			switchMap(filter => this.animeService.getList(filter)),
		);

	/** Variable where stored anime info. */
	public animeList$: Observable<AnimePagination<Anime>>;

	/** Type list. */
	public typeList: string[] = ['TV', 'OVA', 'MOVIE', 'SPECIAL', 'ONA', 'MUSIC', 'PROMOTIONAL_VIDEOS', 'UNKNOWN'];

	/** In start page size. */
	public pageSize = 25;

	/** Page Index. */
	public pageIndex = 0;

	/** Show first and last buttons in paginator. */
	public showFirstLastButtons = true;

	public constructor() {
		this.animeList$ = this.results$;
	}

	/**
		* Handle paginator event.
		* @param paginatorEvent  - Event. */
	public handlePaginatorEvent(paginatorEvent: PageEvent): void {
		this.results.set({ ...this.results(), paginator: { pageIndex: paginatorEvent.pageIndex, pageSize: paginatorEvent.pageSize } });
		this.pageIndex = paginatorEvent.pageIndex;
		this.pageSize = paginatorEvent.pageSize;
	}

	/**
		* Announce the change in sort state.
		* @param sortState - Sort state.
		* */
	public sortChangeAnime(sortState: Sort): void {
		this.results.set({ ...this.results(), sort: sortState });
	}

	/** Search Value. */
	public searchValue = '';

	/** Search anime event. */
	public searchAnime(): void {
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, search: this.searchValue });
		this.pageIndex = 0;
	}

	/** Clear search value. */
	public clearSearchValue(): void {
		this.searchValue = '';
		this.pageIndex = 0;
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, search: this.searchValue });
	}

	/**
		* Select change type anime.
		* @param selectEvent - Select Event.
		* */
	public selectChange(selectEvent: MatSelectChange): void {
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, select: selectEvent.value });
		this.pageIndex = 0;
	}

	/** Name columns for table module. */
	public displayedColumns = ['image', 'title_eng', 'title_jpn', 'aired__startswith', 'type', 'status'] as const;

}
