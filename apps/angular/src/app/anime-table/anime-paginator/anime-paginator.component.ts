import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

/** Anime paginator. */
@Component({
	selector: 'anime-paginator',
	styleUrl: './anime-paginator.component.css',
	templateUrl: 'anime-paginator.component.html',
	standalone: true,
	imports: [MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePaginatorComponent {}
