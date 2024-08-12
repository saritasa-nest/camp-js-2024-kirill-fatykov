import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Login component. */
@Component({
	selector: 'camp-root',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone: true,
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
