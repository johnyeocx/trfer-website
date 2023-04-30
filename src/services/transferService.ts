import { endpoint } from "@/misc/constants";
import axios, { InternalAxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

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

export class TransferService {
	static transferOpenAmt = async (
		username: any,
		amount: number,
		note: string
	) =>
		await axios.post(`${endpoint}/api/transfer/open_amount`, {
			to_username: username,
			amount,
			note,
		});
}
