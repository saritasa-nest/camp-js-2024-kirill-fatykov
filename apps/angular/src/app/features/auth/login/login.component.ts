import { RouterModule } from '@angular/router';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormErrorsService } from '@js-camp/angular/core/services/form-errors.service';

/** Login component. */
@Component({
	selector: 'camp-root',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone: true,
	imports: [RouterModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	/** Service with form errors. */
	public serviceErrors = inject(FormErrorsService);

	/** Login form. */
	protected loginForm = this.fb.group({
		email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(254)]),
		password: this.fb.control('', [Validators.required, Validators.maxLength(128)]),
	});

	/** Handle login form. */
	public onSubmit(): void {

		if (this.loginForm.valid) {
			// this.animeService.login(this.loginForm.getRawValue()).subscribe(item => console.warn(item));
		}
	}
}
