import { Pipe, PipeTransform } from '@angular/core';

type EmptyString = string | null | undefined;

const emptyStringTypeof = ['null', 'undefined', 'NaN'];

/** Pipe for empty string.*/
@Pipe({
	standalone: true,
	name: 'replace',
})
export class ReplaceEmptyStringPipe implements PipeTransform {
	/** Can choose what value replace.
		* @param string - Value what replace.
		* @param replaceValue - Value whit replace.
		*/
	public transform(string: EmptyString, replaceValue = '-'): EmptyString {
		console.log(typeof string)
		return string?.trim().length === 0 ? replaceValue : string;
	}
}
