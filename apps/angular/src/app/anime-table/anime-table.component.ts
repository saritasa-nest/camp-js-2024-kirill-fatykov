import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AnimeDomain } from '@js-camp/core/models/anime-domain.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';

/** Table with Anime list. */
@Component({
	selector: 'anime-table',
	styleUrls: ['../../theme/typography.css', './anime-table.component.css'],
	templateUrl: 'anime-table.component.html',
	standalone: true,
	imports: [MatTableModule, AsyncPipe, DatePipe],
})
export class AnimeTableComponent {
	/** Variable where stored anime info. */
	public animeAll$: Observable<AnimeDomain[]>;

	private animeService = inject(AnimeService);

	public constructor() {
		this.animeAll$ = this.animeService.getAnime();
	}

	/** Name columns for table module. */
	public displayedColumns: string[] = ['image', 'titleEng', 'titleJpn', 'airedStart', 'type', 'status'];

}
