export enum PMIStatus {
	succeeded = "succeeded",
	requiresAction = "requires_action",
	paymentFailed = "payment_failed",
	cancelled = "cancelled",
}

export class PMIFuncs {
	static stringToPMIStatus = (status: string): PMIStatus => {
		if (status == PMIStatus.succeeded) return PMIStatus.succeeded;
		else if (status == PMIStatus.requiresAction)
			return PMIStatus.requiresAction;
		else if (status == PMIStatus.cancelled) return PMIStatus.cancelled;
		else return PMIStatus.paymentFailed;
	};
}

export type Invoice = {
	id: number;
	status: string;
	total: number;
	created: number;
	invoiceUrl: string;
	subId: number;
	cardId: number;
	paymentIntentStatus: PMIStatus;
};

export class InvoiceFuncs {
	static fromJson = (json: any): Invoice => {
		return {
			id: json.invoice_id,
			status: json.status,
			total: json.total,
			created: json.created,
			invoiceUrl: json.invoice_url,
			subId: json.sub_id,
			cardId: json.card_id,
			paymentIntentStatus: PMIFuncs.stringToPMIStatus(
				json.payment_intent_status
			),
		};
	};
}
