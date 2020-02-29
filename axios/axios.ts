import Axios, { AxiosError } from 'axios';

const axios = Axios.create({
	// baseURL: 'https://weather-app-proxy-js.herokuapp.com/',
	// baseURL: process.env.REACT_APP_PROXY_URL,
	baseURL: 'http://192.168.1.4:3390/',
	withCredentials: true
});

export const logReqError = (err: AxiosError) => {
	console.log("%cError: ",
		'color: red; font-weight: bold',
		err.response || err);
};

export default axios;