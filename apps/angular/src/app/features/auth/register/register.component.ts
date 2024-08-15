import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
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
		email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(254)]),
		firstName: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
		lastName: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
		password: this.fb.control('', [Validators.required, Validators.maxLength(128)]),
		retypePassword: this.fb.control('', [Validators.required, Validators.maxLength(128)]),
	});

	/** Handle register form. */
	public onSubmit(): void {
		console.warn(this.registerForm.errors);
		console.warn(this.registerForm.value);
	}
}
