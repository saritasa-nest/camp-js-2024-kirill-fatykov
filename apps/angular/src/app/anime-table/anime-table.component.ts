import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime.model';

// import { AnimePagination } from '@js-camp/core/models/anime-pagination';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { map } from 'rxjs';

import { ReplaceEmptyStringPipe } from '../features/replaceEmptyString.pipe';

import { AnimePaginatorComponent } from './anime-paginator/anime-paginator.component';

/** Table with Anime list. */
@Component({
	selector: 'anime-table',
	styleUrls: ['../../theme/typography.css', './anime-table.component.css'],
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [
		MatTableModule,
		AnimePaginatorComponent,
		AsyncPipe,
		DatePipe,
		ReplaceEmptyStringPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {

	private index = 0;

	/** Variable where stored anime info. */
	public animeList = signal<Anime[]>([]);

	private animeService = inject(AnimeService);

	public constructor() {
	}

	/** */
	public ngOnInit(): void {
		this.getAnime();
	}

	/** */
	public getAnime(): void {
		this.animeService.getList(String(this.index * 25))
			.pipe(map(data => data.results))
			.subscribe(data => {
				this.animeList.set([...data]);
			});
	}

	/** @param item  A. */
	public handlePageEvent(item: number): void {
		this.index = item;
		this.getAnime();
	}

	/** Name columns for table module. */
	public displayedColumns = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'] as const;

}
