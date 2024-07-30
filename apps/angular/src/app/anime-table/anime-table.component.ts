import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';

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
export class AnimeTableComponent {
	/** Variable where stored anime info. */
	public animeList$: Observable<Anime[]>;

	private animeService = inject(AnimeService);

	public constructor() {
		this.animeList$ = this.animeService.getList();
	}

	/** Name columns for table module. */
	public displayedColumns = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'] as const;

}
