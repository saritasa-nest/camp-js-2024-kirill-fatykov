/** Anime filters. */
export type AnimeFilters = Readonly<{

	/** Pagination event value. */
	pagination?: {

		/** Page index. */
		pageIndex: number;

		/** Page size. */
		pageSize: number;
	};

	/** Sort event value. */
	sort?: {

		/** Active sort. */
		active: string;

		/** Sort direction. */
		direction?: string;
	};

	/** Search event value. */
	search?: string;

	/** Select event value. */
	select?: string[];
}>;
