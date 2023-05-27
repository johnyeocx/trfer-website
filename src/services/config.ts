import { accessTokenKey, endpoint, refreshTokenKey } from "@/misc/constants";
import axios, { AxiosError } from "axios";

export const requestInterceptor = async (config: any) => {
	const { withCredentials } = config;

	if (withCredentials === false) return config;

	let access_token = localStorage.getItem(accessTokenKey);
	if (access_token === null || access_token === undefined) {
		return config;
	}

	config.headers.Authorization = `Bearer ${access_token}`;

	return config;
};

export const responseInterceptor = async (error: AxiosError) => {
	const { config, response }: any = error;

	const refreshCondition =
		config.withCredentials !== false &&
		response.status === 401 &&
		config.url !== `${endpoint}/api/auth/refresh_user_token`;
	if (!refreshCondition) return Promise.reject(error);

	const refreshToken = localStorage.getItem(refreshTokenKey);
	if (refreshToken === null || refreshToken === undefined)
		return Promise.reject(error);

	try {
		const { data } = await axios.post(
			`${endpoint}/api/auth/refresh_user_token`,
			{
				refresh_token: refreshToken,
			},
			{ withCredentials: false }
		);
		localStorage.setItem(accessTokenKey, data.access_token);
		localStorage.setItem(refreshTokenKey, data.refresh_token);

		return axios(config);
	} catch (error) {
		console.log("Failed to refresh:", error);
		return Promise.reject(error);
	}
};
