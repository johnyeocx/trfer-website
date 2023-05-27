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

export class BankingService {
	static getAuthLinkToken = async () =>
		await axios.get(`${endpoint}/api/banking/get_auth_link_token`);

	static createAccessToken = async (publicToken: string) =>
		await axios.post(`${endpoint}/api/banking/create_access_token`, {
			public_token: publicToken,
		});

	static createRecipientId = async () =>
		await axios.post(`${endpoint}/api/banking/create_recipient_id`);
}
