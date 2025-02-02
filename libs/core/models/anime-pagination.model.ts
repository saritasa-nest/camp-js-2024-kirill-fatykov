/** Pagination meta info.*/
export type AnimePagination<T> = Readonly<{

	/** Total count of items. */
	count: number;

	/** Next page of items. */
	next: string | null;

	/** Previous page of items. */
	previous: string | null;

	/** Array of items requested. */
	results: readonly T[];
}>;
