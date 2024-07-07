import axios from 'axios';

const instance = axios.create({
	// baseURL: 'http://localhost:4444/',
	baseURL: 'https://blog-mern-ows8.onrender.com/',
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');

	return config;
});

export default instance;
