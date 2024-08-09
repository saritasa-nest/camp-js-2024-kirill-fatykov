import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AnimeTypeDto } from '@js-camp/core/dtos/anime-type.dto';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimePagination } from '@js-camp/core/models/anime-pagination.model';
import { QueryService } from '@js-camp/angular/core/services/query.service';
import { AnimeFilters } from '@js-camp/core/models/anime-filters.model';

import { EmptyPipe } from '../features/empty.pipe';

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
		EmptyPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	private readonly animeService = inject(AnimeService);

	private readonly filter = inject(QueryService).filter;

	private readonly fb = inject(NonNullableFormBuilder);

	/** Variable where stored anime info. */
	protected readonly animeList$: Observable<AnimePagination<Anime>>;

	/** Name columns for table module. */
	protected readonly displayedColumns = [
		'image',
		'title_eng',
		'title_jpn',
		'aired__startswith',
		'type',
		'status',
	] as const;

	/** List of anime types. */
	protected readonly animeTypeList: string[] = Object.values(AnimeTypeDto);

	/** Form for search. */
	protected readonly searchForm = this.fb.group({
		search: this.fb.control(''),
	});

	/** Page size. */
	protected pageSize = 25;

	/** Page Index. */
	protected pageIndex = 0;

	/** Show first and last buttons in paginator. */
	protected showFirstLastButtons = true;

	/** Results of all events. */
	protected results: AnimeFilters = {};

	private readonly filter$ = new BehaviorSubject<AnimeFilters>({});

	public constructor() {
		this.animeList$ = this.filter$.pipe(
			map(item => this.filter(item)),
			switchMap(filter => this.animeService.getList(filter)),
		);
	}

	/** Update anime list. */
	protected updateAnimeList(): void {
		this.filter$.next(this.results);
	}

	/**
	 * Handle the anime paginator event.
	 * @param paginatorEvent Paginator event.
	 * */
	protected onPageChange(paginatorEvent: PageEvent): void {
		this.pageIndex = paginatorEvent.pageIndex;
		this.pageSize = paginatorEvent.pageSize;
		this.results = {
			...this.results,
			paginator: { pageIndex: paginatorEvent.pageIndex, pageSize: paginatorEvent.pageSize },
		};
	}

	/**
	 * Handles anime sorting changes.
	 * @param sortEvent Sort event.
	 * */
	protected onSortAnime(sortEvent: Sort): void {
		this.results = { ...this.results, sort: sortEvent };
		this.updateAnimeList();
	}

	/** Handles the anime search event. */
	protected onSearchAnime(): void {
		this.pageIndex = 0;
		this.results = { ...this.results, paginator: { pageIndex: 0, pageSize: this.pageSize }, ...this.searchForm.value };
		this.updateAnimeList();
	}

	/** Reset search value. */
	protected resetSearchValue(): void {
		this.searchForm.setValue({ search: '' });
		this.pageIndex = 0;
		this.results = { ...this.results, paginator: { pageIndex: 0, pageSize: this.pageSize }, ...this.searchForm.value };
		this.updateAnimeList();
	}

	/**
	 * Handles the selection of anime type.
	 * @param selectEvent Select event.
	 * */
	protected onTypeSelect(selectEvent: MatSelectChange): void {
		this.pageIndex = 0;
		this.results = { ...this.results, paginator: { pageIndex: 0, pageSize: this.pageSize }, select: selectEvent.value };
		this.updateAnimeList();
	}
}
