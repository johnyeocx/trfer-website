export type AuthErrs = {
	passwordErr: boolean;
	emailErr: boolean;
	confirmPwErr: boolean;
};

export type AuthReqErrs = {};

export class AuthErrFuncs {
	static getExtRegisterErrText = (status: number, data: any): string => {
		// STATUS CONFLIGCTS
		if (status == 409) {
			if (data == "email_taken") return "Email already taken";
			else if (data == "username_taken") return "Username already taken";
		} else return "Failed to register. Server / connection error";

		return "";
	};

	static getExtSigninErrText = (status: number, data: any): string => {
		// STATUS CONFLIGCTS
		console.log("Error status:", status);
		if (status == 404) {
			return `The email you that you signed in with is not valid.`;
		} else return "Failed to register. Server / connection error";
	};

	static initAuthErrs = (): AuthErrs => {
		return {
			passwordErr: false,
			emailErr: false,
			confirmPwErr: false,
		};
	};

	static getVerifyReqErrText = (status: number): string => {
		// STATUS CONFLIGCTS
		if (status == 403) {
			return "Invalid otp provided. Please try again.";
		} else return "Failed to verify email. Please try again.";
	};

	static getLoginReqErrText = (
		status: number,
		data: { [key: string]: any } | null
	): string => {
		console.log("Status:", status);

		if (status == 406) {
			return "Email / password invalid";
		} else if (status == 404) {
			return "Email doesn't exist. Please create an account";
		} else if (status == 403) {
			return `Failed to login. This account was created through ${data?.signin_provider}`;
		} else return "Failed to login. Server / connection error";
	};

	static getRegReqErrText = (status: number): string => {
		// STATUS CONFLIGCTS
		if (status == 409) {
			return "Email already exists. Please login instead.";
		} else return "Failed to register. Server / connection error";
	};

	static emailValid = (email: string) => {
		return email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	static passwordValid = (pw: string) => {
		return pw.length >= 8;
	};

	static checkEmailAndPassword = (email: string, password: string) => {
		const emailInvalid = !this.emailValid(email);
		const passwordInvalid = !this.passwordValid(password);

		let errText = "";
		if (emailInvalid) {
			errText = "Email is invalid";
		}

		if (passwordInvalid) {
			errText = "Password must be 8 or more characters";
		}
		return {
			errors: {
				confirmPwErr: false,
				passwordErr: passwordInvalid,
				emailErr: emailInvalid,
			},
			errText,
		};
	};

	static regErrCheck = (email: string, password: string, confirmPw: string) => {
		const emailInvalid = !this.emailValid(email);
		const passwordInvalid = !this.passwordValid(password);
		const confirmPwInvalid = password !== confirmPw;

		let errText = "";
		if (emailInvalid) {
			errText = "Email is invalid";
		}

		if (passwordInvalid) {
			errText = "Password must be 8 or more characters";
		}

		if (confirmPwInvalid) {
			errText = "Passwords don't match";
		}

		return {
			errors: {
				passwordErr: passwordInvalid,
				emailErr: emailInvalid,
				confirmPwErr: confirmPwInvalid,
			},
			errText,
		};
	};

	static hasError = (errs: AuthErrs) => {
		return errs.emailErr || errs.passwordErr || errs.confirmPwErr;
	};
}
