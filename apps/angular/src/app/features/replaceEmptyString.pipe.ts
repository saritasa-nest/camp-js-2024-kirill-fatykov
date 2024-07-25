import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for empty string.*/
@Pipe({
	standalone: true,
	name: 'replace',
})
export class ReplaceEmptyStringPipe implements PipeTransform {
	/** We can choose what value replace.*/
	public transform(string: string | null, replaceValue = '-'): string {
		return string?.trim().length === 0 || string === null ? replaceValue : string;
	}
}
