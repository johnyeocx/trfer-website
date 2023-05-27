import { PhoneNumber, PhoneNumberFuncs } from "../PhoneNumber";
import { Address, AddressFuncs } from "../user/Address";

export enum PaymentType {
	templatePayment = "template_payment",
	customPayment = "custom_payment",
	customAuthorisation = "custom_authorisation",
}

export type Payment = {
	id: string;
	userId: number;
	paymentType: PaymentType;
	templateId: number | null;
	customLinkId: number | null;
	amount: number;
	currency: string;
	email: string;
	fullName: string;
	companyName: string | null;
	mobileNumber: PhoneNumber | null;
	address: Address | null;
	reference: string;
	paymentStatus: string;
};

export class PaymentFuncs {
	static toInitiateJson = (p: any): any => {
		return {
			user_id: p.userId,
			payment_type: p.paymentType,
			template_id: p.templateId,
			custom_link_id: p.customLinkId,
			// amount: p.amount,
			// currency: p.currency,
			email: p.email,
			full_name: p.fullName,
			company_name: p.companyName,
			mobile_number: PhoneNumberFuncs.toJson(p.mobileNumber),
			address: AddressFuncs.toJson(p.address),
		};
	};
	// static sortPaymentsByDate(payments: Array<Payment>): Array<Array<Payment>> {
	// 	let sorted: Array<Array<Payment>> = [];
	// 	for (let i = 0; i < payments.length; i++) {
	// 		if (
	// 			i == 0 ||
	// 			new Date(payments[i].created).setUTCHours(0, 0, 0, 0) !=
	// 				new Date(payments[i - 1].created).setUTCHours(0, 0, 0, 0)
	// 		) {
	// 			sorted.push([]);
	// 		}
	// 		sorted[sorted.length - 1].push(payments[i]);
	// 	}
	// 	return sorted;
	// }
}
