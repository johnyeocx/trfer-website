export type ServiceTemplate = {
	id: number;
	strId: string;
	serviceName: string;
	defaultPrice: number | null;
	collectCompanyName: boolean;
	collectMobileNumber: boolean;
	collectAddress: boolean;
	addNote: boolean;
	note: string | null;
	published: boolean;
	createdAt: number;
};

export class TemplateFuncs {
	static updateTemplateJson = (t: any): any => {
		return {
			template_id: t.id,
			service_name: t.serviceName,
			default_price: t.defaultPrice,
			collect_company_name: t.collectCompanyName,
			collect_mobile_number: t.collectMobileNumber,
			collect_address: t.collectAddress,
			add_note: t.addNote,
			note: t.note,
			// createdAt: Date.parse(json.created_at),
		};
	};

	static fromJson = (json: any): ServiceTemplate => {
		return {
			id: json.template_id,
			strId: json.str_id,
			serviceName: json.service_name,
			defaultPrice: json.default_price,
			collectCompanyName: json.collect_company_name,
			collectMobileNumber: json.collect_mobile_number,
			collectAddress: json.collect_address,
			addNote: json.add_note,
			note: json.note,
			published: json.published,
			createdAt: Date.parse(json.created_at),
		};
	};
}
