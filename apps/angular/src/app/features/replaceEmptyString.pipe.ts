import { Pipe, PipeTransform } from '@angular/core';

type EmptyString = string | null | undefined;

const emptyStringTypeof = [null, undefined];

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
	public transform(string: string , replaceValue = '-'): EmptyString {
		return string?.trim().length === 0 ||  string === null || string === undefined ? replaceValue : string;
	}
}
