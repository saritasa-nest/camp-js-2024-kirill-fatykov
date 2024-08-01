import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** Anime paginator. */
@Component({
	selector: 'anime-paginator',
	styleUrl: './anime-paginator.component.css',
	templateUrl: 'anime-paginator.component.html',
	standalone: true,
	imports: [MatPaginatorModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePaginatorComponent {

	/** */
	@Output() public addItemEvent = new EventEmitter<number>();

	/**
		* A.
		* @param e A.
		*/
	public handlePageEvent(e: PageEvent): void {
		this.addItemEvent.emit(e.pageIndex);
	}
}
