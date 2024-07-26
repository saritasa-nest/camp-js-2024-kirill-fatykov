import { Pipe, PipeTransform } from '@angular/core';

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
	public transform(string: string | null, replaceValue: string): string {
		return string?.trim().length === 0 || string === null ? replaceValue : string;
	}
}
