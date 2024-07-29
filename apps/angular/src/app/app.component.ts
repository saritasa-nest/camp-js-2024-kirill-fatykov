import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
