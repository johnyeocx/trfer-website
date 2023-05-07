import { setPageTheme, setUser } from "@/redux/user/userSlice";
import { UserService } from "@/services/userService";
import { format } from "date-fns";
import Compressor from "compressorjs";

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
		noDetailsCallback: any
	) => {
		const user = await UserService.getUserData(dispatch);
		if (!user) {
			router.push("/login");
			return;
		}
		if (
			user!.firstName == null ||
			user!.lastName == null ||
			user!.publicToken == null
		) {
			await noDetailsCallback();
			return;
		}

		dispatch(setUser(user));
		dispatch(setPageTheme({ pageTheme: user.pageTheme }));
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
}
