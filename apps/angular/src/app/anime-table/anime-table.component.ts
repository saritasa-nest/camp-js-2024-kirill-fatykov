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

import { AnimeTypeDto } from '@js-camp/core/dtos/anime-type.dto';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimePagination } from '@js-camp/core/models/anime-pagination.model';
import { QueryService } from '@js-camp/angular/core/services/query.service';
import { AnimeEvents } from '@js-camp/core/models/anime-events.model';

import { ReplaceEmptyOnValuePipe } from '../features/replaceEmptyOnValue.pipe';

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
		ReplaceEmptyOnValuePipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	private readonly animeService = inject(AnimeService);

	private readonly filter = inject(QueryService).filter;

	private readonly results = signal<AnimeEvents>({});

	private readonly results$ = toObservable(this.results)
		.pipe(
			map(item => this.filter(item)),
			switchMap(filter => this.animeService.getList(filter)),
		);

	/** Variable where stored anime info. */
	protected readonly animeList$: Observable<AnimePagination<Anime>>;

	/** List of anime types. */
	protected readonly animeTypeList: string[] = Object.values(AnimeTypeDto);

	/** In start page size. */
	protected pageSize = 25;

	/** Page Index. */
	protected pageIndex = 0;

	/** Show first and last buttons in paginator. */
	protected showFirstLastButtons = true;

	public constructor() {
		this.animeList$ = this.results$;
	}

	/**
		* Handle the anime paginator event.
		* @param paginatorEvent  - Paginator event. */
	protected onPaginatorAnime(paginatorEvent: PageEvent): void {
		this.results.set({ ...this.results(), paginator: { pageIndex: paginatorEvent.pageIndex, pageSize: paginatorEvent.pageSize } });
		this.pageIndex = paginatorEvent.pageIndex;
		this.pageSize = paginatorEvent.pageSize;
	}

	/**
		* Handles anime sorting changes.
		* @param sortEvent - Sort event.
		* */
	protected onSortAnime(sortEvent: Sort): void {
		this.results.set({ ...this.results(), sort: sortEvent });
	}

	/** Search Value. */
	protected searchValue = '';

	/** Handles the anime search event. */
	protected onSearchAnime(): void {
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, search: this.searchValue });
		this.pageIndex = 0;
	}

	/** Reset search value. */
	protected resetSearchValue(): void {
		this.searchValue = '';
		this.pageIndex = 0;
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, search: this.searchValue });
	}

	/**
		* Handles the selection of anime type.
		* @param selectEvent - Select event.
		* */
	protected onTypeSelect(selectEvent: MatSelectChange): void {
		this.results.set({ paginator: { pageIndex: 0, pageSize: this.pageSize }, select: selectEvent.value });
		this.pageIndex = 0;
	}

	/** Name columns for table module. */
	protected readonly displayedColumns = ['image', 'title_eng', 'title_jpn', 'aired__startswith', 'type', 'status'] as const;
}
