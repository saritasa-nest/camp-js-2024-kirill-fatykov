import { BehaviorSubject, Observable, first, map, switchMap, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

	private readonly destroyRef = inject(DestroyRef);

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
	protected readonly searchControl = this.fb.control('');

	/** Page size. */
	protected pageSize = 25;

	/** Page Index. */
	protected pageIndex = 0;

	/** Show first and last buttons in paginator. */
	protected showFirstLastButtons = true;

	private readonly filter$ = new BehaviorSubject<AnimeFilters>({});

	public constructor() {
		this.animeList$ = this.filter$.pipe(
			map(item => this.filter(item)),
			switchMap(filter => this.animeService.getList(filter)),
		);
	}

	/**
	 * Track by function for anime list.
	 * @param index Anime list item index.
	 * @param item Item of anime list.
	 */
	protected trackByAnime(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/**
	 * Handle the anime paginator event.
	 * @param paginatorEvent Paginator event.
	 * */
	protected onPageChange(paginatorEvent: PageEvent): void {
		this.pageIndex = paginatorEvent.pageIndex;
		this.pageSize = paginatorEvent.pageSize;
		this.updateValueFilter({
			pagination: { pageIndex: paginatorEvent.pageIndex, pageSize: paginatorEvent.pageSize },
		});
	}

	/**
	 * Handles anime sorting changes.
	 * @param sortEvent Sort event.
	 * */
	protected onSortAnime(sortEvent: Sort): void {
		this.updateValueFilter({ sort: sortEvent });
	}

	/** Handles the anime search event. */
	protected onSearchAnime(): void {
		this.pageIndex = 0;
		this.updateValueFilter({
			pagination: { pageIndex: 0, pageSize: this.pageSize },
			search: this.searchControl.value,
		});
	}

	/** Reset search value. */
	protected resetSearchValue(): void {
		this.searchControl.setValue('');
		this.pageIndex = 0;
		this.updateValueFilter({
			pagination: { pageIndex: this.pageIndex, pageSize: this.pageSize },
			search: this.searchControl.value,
		});
	}

	/**
	 * Handles the selection of anime type.
	 * @param selectEvent Select event.
	 * */
	protected onTypeSelect(selectEvent: MatSelectChange): void {
		this.pageIndex = 0;
		this.updateValueFilter({
			pagination: { pageIndex: this.pageIndex, pageSize: this.pageSize },
			select: selectEvent.value,
		});
	}

	/**
	 * Update Values Filter.
	 * @param filters Filters.
	 * */
	protected updateValueFilter(filters: AnimeFilters): void {
		this.filter$
			.pipe(
				first(),
				tap(value => this.filter$.next({ ...value, ...filters })),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
