import { accessTokenKey, endpoint } from "@/misc/constants";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { requestInterceptor, responseInterceptor } from "./config";

axios.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

axios.interceptors.response.use((response) => {
	return response;
}, responseInterceptor);

export class PersService {
	static getInqSessionToken = async () =>
		await axios.get(`${endpoint}/api/pers/session_token`);
}
