type ImportMetaEnv = {

	/** Api base url. */
	readonly VITE_APP_API_BASE_URL: string;
};

type ImportMeta = {

	/** Contains application environment data. */
	readonly env: ImportMetaEnv;
};
