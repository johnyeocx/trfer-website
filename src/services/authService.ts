import { accessTokenKey, endpoint } from "@/misc/constants";
import { AuthStatus, setAuthStatus } from "@/redux/appSlice";
import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./config";

axios.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

axios.interceptors.response.use((response) => {
	return response;
}, responseInterceptor);

export class AuthService {
	static verifyEmailRegister = async (body: { email: string; otp: string }) =>
		await axios.post(`${endpoint}/api/auth/verify_email_register_otp`, body);

	static verifyEmailLogin = async (body: { email: string; otp: string }) =>
		await axios.post(`${endpoint}/api/auth/verify_email_login_otp`, body, {
			withCredentials: false,
		});

	static login = async (email: string) => {
		return await axios.post(
			`${endpoint}/api/auth/login`,
			{ email },
			{ withCredentials: false }
		);
	};

	static authenticate = async (dispatch: any) => {
		try {
			await AuthService.validate();
		} catch (error) {
			return false;
		}
		dispatch(setAuthStatus(AuthStatus.loggedIn));
		return true;
	};

	static validate = async () =>
		await axios.post(`${endpoint}/api/auth/validate`);

	static extSignIn = async (body: { token: string | undefined }) =>
		await axios.post(`${endpoint}/api/c/auth/google_sign_in`, body);

	// static resendEmailVerification = async (body: {
	// 	email: string;
	// 	otpType: string;
	// }) => await axios.post(`${endpoint}/api/c/customer/resend_email_otp`, body);
}
