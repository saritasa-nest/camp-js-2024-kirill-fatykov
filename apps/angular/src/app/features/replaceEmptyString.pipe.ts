import { Pipe, PipeTransform } from '@angular/core';

type InputValue = string | number | null | undefined;

/** Pipe for empty string. */
@Pipe({
	standalone: true,
	name: 'replace',
})
export class ReplaceEmptyStringPipe implements PipeTransform {
	/** 
		* Can choose what value replace.
		* @param value - Value what replace.
		* @param replaceValue - Value whit replace.
		*/
	public transform(value: InputValue, replaceValue = '-'): string | number {
		switch (typeof value) {
			case 'string':
				return value?.trim().length === 0 ? replaceValue : value;
			case 'number':
				return isNaN(value) ? replaceValue : value;
			default:
				return replaceValue;
		}
	}
}
