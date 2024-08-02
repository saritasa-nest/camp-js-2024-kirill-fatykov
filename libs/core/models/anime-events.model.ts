/** Anime Events. */
export type AnimeEvents = {

	/** Paginator event. */
	paginator?: {

		/** Page index. */
		pageIndex: number;

		/** Page size. */
		pageSize: number;
	} | undefined;

	/** Sort event. */
	sort?: {

		/** Active sort. */
		active: string;

		/** Sort direction. */
		direction: string | undefined;
	} | undefined;
};
