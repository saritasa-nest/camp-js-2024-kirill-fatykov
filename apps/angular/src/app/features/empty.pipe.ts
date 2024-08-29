import { Pipe, PipeTransform } from '@angular/core';

type InputEmptyValue = string | number | null | undefined;

/** Pipe for empty value. */
@Pipe({
	standalone: true,
	name: 'empty',
})
export class EmptyPipe implements PipeTransform {
	/**
		* Check empty value and replace on new value.
		* @param value - Value what replace.
		* @param replaceValue - Value whit replace.
		*/
	public transform(value: InputEmptyValue, replaceValue: string | undefined = '-'): string | number {
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
