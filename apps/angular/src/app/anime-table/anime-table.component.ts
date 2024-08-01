import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime.model';

// import { AnimePagination } from '@js-camp/core/models/anime-pagination';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { map } from 'rxjs';

import { ReplaceEmptyStringPipe } from '../features/replaceEmptyString.pipe';

/** Table with Anime list. */
@Component({
	selector: 'anime-table',
	styleUrls: ['../../theme/typography.css', './anime-table.component.css'],
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [
		MatPaginatorModule,
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

	private offset = 0;

	/** Anime length. */
	public animeLength = signal(0);

	/** Anime limit. */
	public limit = 25;

	private index = 0;

	/** Show first and last buttons in paginator. */
	public showFirstLastButtons = true;

	public constructor() {
	}

	/** */
	public ngOnInit(): void {
		this.loadingAnime();
		this.loadingAnimeLength();
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
	public loadingAnimeLength(): void {
		this.animeService.getList()
			.pipe(map(data => data.count))
			.subscribe(count => {
				this.animeLength.set(count);
			});
	}

	/** Loading Anime list. */
	public loadingAnime(): void {
		this.animeService.getList(this.getLimit(), this.getOffset())
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
		this.loadingAnime();
	}

	/** Name columns for table module. */
	public displayedColumns = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'] as const;

}
