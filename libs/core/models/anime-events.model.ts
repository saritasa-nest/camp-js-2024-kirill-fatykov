/** Anime events values. */
export type AnimeEvents = Readonly<{

	/** Paginator event value. */
	paginator?: {

		/** Page index. */
		pageIndex: number;

		/** Page size. */
		pageSize: number;
	} | undefined;

	/** Sort event value. */
	sort?: {

		/** Active sort. */
		active: string;

		/** Sort direction. */
		direction: string | undefined;
	} | undefined;

	/** Sort event value. */
	search?: string | undefined;

	/** Select event value. */
	select?: string[] | undefined;
}>;
