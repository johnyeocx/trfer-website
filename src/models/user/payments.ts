import { s3Endpoint } from "@/misc/constants";
import { PageTheme, strToPageTheme } from "../page_themes/PageThemes";

export type Payment = {
	id: string;
	amount: number;
	note: string;
	reference: string;
	created: number;
	payerName: string;
};

export class PaymentFuncs {
	static fromJson = (json: any): Payment => {
		return {
			id: json.payment_id,
			amount: json.amount,
			note: json.note,
			reference: json.reference,
			created: Date.parse(json.created),
			payerName: json.payer_name,
		};
	};

	static sortPaymentsByDate(payments: Array<Payment>): Array<Array<Payment>> {
		let sorted: Array<Array<Payment>> = [];
		for (let i = 0; i < payments.length; i++) {
			if (
				i == 0 ||
				new Date(payments[i].created).setUTCHours(0, 0, 0, 0) !=
					new Date(payments[i - 1].created).setUTCHours(0, 0, 0, 0)
			) {
				sorted.push([]);
			}
			sorted[sorted.length - 1].push(payments[i]);
		}
		return sorted;
	}
}
