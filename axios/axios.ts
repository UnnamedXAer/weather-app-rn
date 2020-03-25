import Axios, { AxiosError } from 'axios';
import { REACT_APP_PROXY_URL } from '../env';

const axios = Axios.create({
	baseURL: REACT_APP_PROXY_URL,
	withCredentials: true
});

export const logReqError = (err: AxiosError) => {
	console.log("Error: ", err.response || err);
};

export default axios;