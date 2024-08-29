import axios from 'axios';

import { CONFIG } from './config';

/** Http config. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
