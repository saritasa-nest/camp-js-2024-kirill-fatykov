import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/** Register component. */
@Component({
	selector: 'camp-root',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	standalone: true,
	imports: [RouterModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	/** Register form. */
	protected registerForm = this.fb.group({
		email: this.fb.control(''),
		firstName: this.fb.control(''),
		lastName: this.fb.control(''),
		password: this.fb.control(''),
		retypePassword: this.fb.control(''),
	});

	/** Handle register form. */
	public onSubmit(): void {
		console.log(this.registerForm.value);
	}
}
