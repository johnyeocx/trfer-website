import { accessTokenKey, endpoint } from "@/misc/constants";
import { AuthStatus, setAuthStatus } from "@/redux/appSlice";
import axios, { InternalAxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Dispatch, SetStateAction } from "react";

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

export class AuthService {
	static verifyEmailRegister = async (body: { email: string; otp: string }) =>
		await axios.post(`${endpoint}/api/auth/verify_email_register_otp`, body);

	static verifyEmailLogin = async (body: { email: string; otp: string }) =>
		await axios.post(`${endpoint}/api/auth/verify_email_login_otp`, body);

	static login = async (email: string) =>
		await axios.post(`${endpoint}/api/auth/login`, { email });

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

	static refreshToken = async () =>
		await axios.post(`${endpoint}/api/c/auth/refresh_token`);

	// static resendEmailVerification = async (body: {
	// 	email: string;
	// 	otpType: string;
	// }) => await axios.post(`${endpoint}/api/c/customer/resend_email_otp`, body);
}
