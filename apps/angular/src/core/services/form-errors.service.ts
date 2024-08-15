import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/** Service with form errors. */
@Injectable({
	providedIn: 'root',
})
export class FormErrorsService {
	private errorsMap: Record<string, string> = {
		required: 'Required field',
		email: 'Incorrect email form',
		maxlength: 'Too match',
	};

	/** Get controls error from FormGroup.
	 * @param valueGroup FormControl.
	 * @param nameControl Name control.
	 */
	public getNameErrorControl(valueGroup: FormControl): string {
		if (valueGroup.errors != null) {
			const nameError = Object.keys(valueGroup.errors)[0];
			return this.errorsMap[nameError] ? this.errorsMap[nameError] : 'Incorrect input form';
		}

		return 'Not errors';
	}
}
