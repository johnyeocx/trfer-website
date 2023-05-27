import { PhoneNumber, PhoneNumberFuncs } from "../PhoneNumber";

export enum LinkType {
	payment = "payment",
	authorisation = "authorisation",
}

export enum InvoiceStatus {
	created = "created",
	paid = "authorisation",
	failed = "failed",
}

export type CustomLink = {
	id: number;
	templateId: number;
	linkType: LinkType;
	strId: string;
	unitAmount: number | null;
	email: string | null;
	fullName: string | null;
	companyName: string | null;
	mobileNumber: PhoneNumber | null;
	status?: InvoiceStatus;
	createdAt?: number;
};

export class CustomLinkFuncs {
	static fromJson(json: any): CustomLink {
		return {
			id: json.link_id,
			templateId: json.template_id,
			linkType: json.link_type,
			strId: json.link_str_id,
			unitAmount: json.unit_amount,
			email: json.email,
			fullName: json.full_name,
			companyName: json.company_name,
			mobileNumber: PhoneNumberFuncs.fromJson(json.mobile_number),
			status: json.status,
			createdAt:
				json.created_at != null ? Date.parse(json.created_at) : undefined,
		};
	}

	static toJson(c: any) {
		return {
			link_id: c.id,
			link_str_id: c.strId,
			template_id: c.templateId,
			link_type: c.linkType,
			unit_amount: c.unitAmount,
			email: c.email,
			full_name: c.fullName,
			company_name: c.companyName,
			dialing_code: c.dialingCode,
			mobile_number: PhoneNumberFuncs.toJson(c.mobileNumber),
			status: c.status,
		};
	}
}
