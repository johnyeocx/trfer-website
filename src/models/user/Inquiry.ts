export enum InquiryStatus {
	created = "created",
	completed = "completed",
	pending = "pending",
	failed = "failed",
	needsReview = "needs_review",
	approved = "approved",
	declined = "declined",
}
export type Inquiry = {
	persAccountId: string;
	persInquiryId: string;
	persSessionId: string | null;
	inquiryStatus: string;
};

export class InquiryFuncs {
	static fromJson = (json: any): Inquiry | null => {
		if (json == null) return null;
		return {
			persAccountId: json.pers_account_id,
			persInquiryId: json.pers_inquiry_id,
			persSessionId: json.pers_session_id,
			inquiryStatus: json.inquiry_status,
		};
	};
}
