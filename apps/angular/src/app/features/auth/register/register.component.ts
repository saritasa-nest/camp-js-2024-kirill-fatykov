import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Register component. */
@Component({
	selector: 'camp-root',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	standalone: true,
	imports: [RouterModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
