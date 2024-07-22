import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';

import { ProfileService } from '../core/services/anime.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [RouterModule],
})
export class AppComponent {
	private profileService: ProfileService = inject(ProfileService);
}
