import { endpoint } from "@/misc/constants";
import axios, { InternalAxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export class PaymentService {
	static initiatePayment = async (payment: any, strId: string) =>
		await axios.post(`${endpoint}/api/payment/initiate_payment`, {
			payment,
			str_id: strId,
		});

	static transferOpenAmt = async (
		username: any,
		amount: number,
		note: string
	) =>
		await axios.post(`${endpoint}/api/payment/open_amount`, {
			to_username: username,
			amount,
			note,
		});
}
