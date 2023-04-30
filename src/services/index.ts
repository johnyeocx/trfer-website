import { accessTokenKey, endpoint } from "@/misc/constants";
import axios, { InternalAxiosRequestConfig } from "axios";
import cookies, { Cookies } from "react-cookie";
import { getCookie } from "typescript-cookie";
const cookieCutter = require("cookie-cutter");

axios.interceptors.request.use(
	(config): any => {
		config.withCredentials = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export class GeneralService {
	static testRequest = async () =>
		await axios.get(endpoint, {
			withCredentials: true,
		});
}
