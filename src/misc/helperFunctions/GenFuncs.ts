import { setPageTheme, setUser } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import { format } from "date-fns";
import Compressor from "compressorjs";
import { AuthStatus, setAuthStatus } from "@/redux/appSlice";
import { ServiceService } from "@/services/serviceService";
import { setServiceTemplates } from "@/redux/service/serviceSlice";
import { TemplateFuncs } from "@/models/service/ServiceTemplate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export class GenFuncs {
	static dateString1 = (date: Date): string => {
		return format(date, "d MMM y");
	};
	// static parseDate = (date: string): Date => {
	// 	console.log(date);
	// 	// return dateUnix;
	// };

	// static parse

	static scaledWidth = (scale: number) => {
		if (!scale) return null;
		return ((1 - scale) / scale) * 100 + 100;
	};

	static initPage = async (
		dispatch: any,
		router: any,
		noDetailsCallback: any,
		skipNotLoggedIn = false
	) => {
		const user = await UserService.getUserData(dispatch);
		if (!user) {
			if (skipNotLoggedIn) return;
			router.push("/login");
			return;
		}

		dispatch(setAuthStatus(AuthStatus.loggedIn));
		dispatch(setUser(user));
		dispatch(setPageTheme({ pageTheme: user!.pageTheme }));

		if (
			(user!.firstName == null ||
				user!.lastName == null ||
				!user!.accessTokenCreated ||
				!user!.persApproved) &&
			noDetailsCallback
		) {
			await noDetailsCallback(user);
			return false;
		}

		return true;
	};

	static initServices = async (dispatch: any, router: any) => {
		try {
			const { data } = await ServiceService.getServiceTemplates();
			let templatesJson = data.templates;
			let templates = [];
			for (let i = 0; i < templatesJson.length; i++) {
				templates.push(TemplateFuncs.fromJson(templatesJson[i]));
			}
			console.log("Service templates:", templates);
			dispatch(setServiceTemplates(templates));
		} catch (error) {
			return false;
		}

		return true;
	};

	static handleProfileImgChange = (e: any, callback: any) => {
		if (e.target.files != null && e.target.files.length > 0) {
			const file = e.target.files[0];
			console.log("File Size:", file.size);

			new Compressor(file, {
				strict: true,
				maxWidth: 1000,
				success(result) {
					callback(result);
				},
				error(err) {
					console.log(err.message);
				},
			});
		}
	};

	static floatToStr = (priceFloat: number): string => {
		return `£${priceFloat.toFixed(2)} GBP`;
	};

	static isEmailValid = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
}
