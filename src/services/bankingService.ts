import { accessTokenKey, endpoint } from "@/misc/constants";
import { AuthStatus, setAuthStatus } from "@/redux/appSlice";
import axios, { InternalAxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Dispatch, SetStateAction } from "react";
import { CusService } from "./cusService";

axios.interceptors.request.use(
	(config): any => {
		config.withCredentials = true;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const refreshAuthLogic = (failedRequest: any) =>
	axios
		.post(`${endpoint}/api/c/auth/refresh_token`, null, {
			withCredentials: true,
		})
		.then((_) => {
			return Promise.resolve();
		});

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);

export class BankingService {
	static getAuthLinkToken = async () =>
		await axios.get(`${endpoint}/api/banking/get_auth_link_token`);
}
