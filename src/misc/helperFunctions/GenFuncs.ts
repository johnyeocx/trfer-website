import { format } from "date-fns";

export class GenFuncs {
	static dateString1 = (date: Date): string => {
		return format(date, "d MMM y");
	};
	// static parseDate = (date: string): Date => {
	// 	console.log(date);
	// 	// return dateUnix;
	// };
}
