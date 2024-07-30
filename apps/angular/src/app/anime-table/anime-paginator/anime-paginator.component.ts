import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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

	/** Count anime items. */
	@Input() public count = 0;

	/** Next page. */
	@Input() public next: string | null = '';

	/** Previous page. */
	@Input() public previous: string | null = '';

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
