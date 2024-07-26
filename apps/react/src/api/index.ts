import axios from 'axios';

import { CONFIG } from './config';

// eslint-disable-next-line jsdoc/require-jsdoc
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
