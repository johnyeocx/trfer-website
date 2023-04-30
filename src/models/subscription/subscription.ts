import { SubProduct, SubProductFuncs } from "../sub_product/subProduct";
import { Business, BusinessFuncs } from "../business/business";
import { Invoice, InvoiceFuncs, PMIStatus } from "./invoice";
import { Interval } from "../sub_product/subPlan";

export type Sub = {
	id: number;
	startDate: number;
	cardId: number;
	business: Business;
	subProduct: SubProduct;
	lastInvoice: Invoice;

	// if cancelled
	cancelled: boolean;
	expires: number | null;
	cancelledDate: number | null;
};

export class SubFuncs {
	static getSubsSorted = (subs: Array<Sub> | null) => {
		if (subs == null) return subs;

		let sortedSubs = [...subs];

		sortedSubs.sort(function (a, b) {
			if (a.cancelled!) return 1;
			if (a.lastInvoice == null) return 1;
			if (a.lastInvoice.paymentIntentStatus != PMIStatus.succeeded) return 1;

			if (b.cancelled!) return -1;
			if (b.lastInvoice == null) return -1;
			if (b.lastInvoice.paymentIntentStatus != PMIStatus.succeeded) return -1;

			if (SubFuncs.nextInvoiceDate(a) > SubFuncs.nextInvoiceDate(b)) {
				return -1;
			} else if (SubFuncs.nextInvoiceDate(a) > SubFuncs.nextInvoiceDate(b))
				return 1;
			else return 0;
		});

		return sortedSubs;
	};

	static getFailedSubs = (subs: Array<Sub>): Array<Sub> => {
		let result: Array<Sub> = [];
		subs.map((sub) => {
			if (!sub.cancelled && this.paymentStatus(sub) !== PMIStatus.succeeded)
				result.push(sub);
		});
		return result;
	};

	static getExpiredSubs = (subs: Array<Sub>): Array<Sub> => {
		let result: Array<Sub> = [];
		subs.map((sub) => {
			if (sub.cancelled && sub.expires! <= new Date().getTime())
				result.push(sub);
		});
		return result;
	};

	static getCurrentSubs = (subs: Array<Sub>): Array<Sub> => {
		let result: Array<Sub> = [];
		subs.map((sub) => {
			if (
				this.paymentStatus(sub) === PMIStatus.succeeded &&
				(!sub.cancelled || sub.expires! > new Date().getTime())
			)
				result.push(sub);
		});
		return result;
	};

	static paymentStatus = (sub: Sub): PMIStatus => {
		return sub.lastInvoice.paymentIntentStatus;
	};

	static nextInvoiceDate = (sub: Sub): Date => {
		const lastInvoice = sub.lastInvoice;

		if (lastInvoice.paymentIntentStatus != PMIStatus.succeeded) {
			return new Date(lastInvoice.created);
		}

		const interval: Interval = sub.subProduct.plan.interval;
		const count: number = sub.subProduct.plan.intervalCount;
		let lastDate: Date = new Date(lastInvoice.created);

		if (interval == "day") {
			lastDate.setUTCDate(lastDate.getDate() + count);
			return lastDate;
		} else if (interval == "week") {
			lastDate.setUTCDate(lastDate.getDate() + count * 7);
			return lastDate;
		} else if (interval == "month") {
			let nextDate = new Date(lastDate);
			nextDate.setMonth(lastDate.getMonth() + count);

			if (nextDate.getMonth() - lastDate.getMonth() > 1) {
				nextDate.setUTCDate(0);
			}

			return nextDate;
		} else {
			let nextDate = new Date(lastDate);
			nextDate.setUTCFullYear(lastDate.getFullYear() + 1);
			return nextDate;
		}
	};

	static fromJson = (json: any): Sub => {
		const business: Business = BusinessFuncs.fromNameAndId(
			json.business_name,
			json.business_id
		);

		return {
			id: json.sub_id,
			startDate: Date.parse(json.start_date),
			cardId: json.card_id,
			business: business,
			subProduct: SubProductFuncs.fromJson(json.sub_product),
			lastInvoice: InvoiceFuncs.fromJson(json.last_invoice),
			cancelled: json.cancelled,
			expires: json.expires ? Date.parse(json.expires) : null,
			cancelledDate: json.cancelled_date
				? Date.parse(json.cancelled_date)
				: null,
		};
	};
}
