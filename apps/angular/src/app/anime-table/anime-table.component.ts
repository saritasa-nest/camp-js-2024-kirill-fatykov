import { map } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

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
export class AnimeTableComponent implements OnInit {

	private animeService = inject(AnimeService);

	/** Variable where stored anime info. */
	public animeList = signal<Anime[]>([]);

	/** Anime length. */
	public animeLength = signal(0);

	/** Anime limit. */
	public limit = 25;

	private index = 0;

	private paginatorValue = '';

	private sortValue = '';

	/** Search Value. */
	public searchValue = '';

	/** A. */
	public toppings = new FormControl('');

	/** A. */
	public toppingList: string[] = ['TV', 'OVA', 'MOVIE', 'SPECIAL', 'ONA', 'MUSIC', 'PROMOTIONAL_VIDEOS', 'UNKNOWN'];

	/** Show first and last buttons in paginator. */
	public showFirstLastButtons = true;

	public constructor() {
	}

	/** Initialization anime list. */
	public ngOnInit(): void {
		this.loadingAnime();
		this.getLength();
	}

	/** Get anime limit. */
	public getLimit(): string {
		return String(this.limit);
	}

	/** Get anime offset. */
	public getOffset(): string {
		return String(this.index * this.limit);
	}

	/** Loading anime length. */
	public getLength(): void {
		this.animeService.getList()
			.pipe(map(data => data.count))
			.subscribe(count => {
				this.animeLength.set(count);
			});
	}

	/** Loading Anime list. */
	public loadingAnime(): void {
		this.animeService.getList(`type__in=${this.toppings.value}`)
			.pipe(map(data => data.results))
			.subscribe(list => {
				this.animeList.set([...list]);
			});
	}

	/**
		* Handle paginator event.
		* @param e  - Event. */
	public handlePaginatorEvent(e: PageEvent): void {
		this.index = e.pageIndex;
		this.limit = e.pageSize;
		this.paginatorValue = `limit=${this.getLimit()}&offset=${this.getOffset()}`;
		this.loadingAnime();
	}

	/**
		* Announce the change in sort state.
		* @param sortState - Sort state.
		* */
	public announceSortChange(sortState: Sort): void {
		const sortDirection: Record<string, string> = {
			asc: '',
			desc: '-',
		};

		this.sortValue = sortState.direction.trim().length === 0 ?
			'' : `ordering=${sortDirection[sortState.direction]}${sortState.active}`;
		this.loadingAnime();
	}

	/** A. */
	public searchAnime(): void {
		this.loadingAnime();
	}

	/** Name columns for table module. */
	public displayedColumns = ['image', 'title_eng', 'title_jpn', 'aired__startswith', 'type', 'status'] as const;

}
