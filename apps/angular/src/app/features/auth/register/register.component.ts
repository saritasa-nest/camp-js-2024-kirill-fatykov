import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Register component. */
@Component({
	selector: 'camp-root',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	standalone: true,
	imports: [RouterModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

	/** Register form. */
	protected registerForm = new FormGroup({});
}
