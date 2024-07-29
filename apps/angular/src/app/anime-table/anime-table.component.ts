import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime-domain.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';

import { ReplaceEmptyStringPipe } from '../features/replaceEmptyString.pipe';

/** Table with Anime list. */
@Component({
	selector: 'anime-table',
	styleUrls: ['../../theme/typography.css', './anime-table.component.css'],
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [MatTableModule, AsyncPipe, DatePipe, ReplaceEmptyStringPipe],
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
