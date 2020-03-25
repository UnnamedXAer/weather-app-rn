import Axios, { AxiosError } from 'axios';
import { REACT_APP_PROXY_URL } from '../env';


console.log(REACT_APP_PROXY_URL);


const axios = Axios.create({
	baseURL:REACT_APP_PROXY_URL ,
	// baseURL: 'http://192.168.1.5:3390/',
		withCredentials: true
});

export const logReqError = (err: AxiosError) => {
	console.log("Error: ", err.response || err);
};

export default axios;