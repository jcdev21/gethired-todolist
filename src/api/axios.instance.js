import axios from 'axios';
import { config } from '../configs';

export default axios.create({
	baseURL: config.api_host,
	timeout: 1000,
});
