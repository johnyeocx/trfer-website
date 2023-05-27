import { ServiceTemplate } from "@/models/service/ServiceTemplate";
import { serviceStateType } from "./serviceSlice";

export const setServiceTemplatesReducer = (
	state: serviceStateType,
	action: {
		payload: Array<ServiceTemplate>;
	}
) => {
	state.templates = action.payload;
};

export const addServiceTemplateReducer = (
	state: serviceStateType,
	action: {
		payload: ServiceTemplate;
	}
) => {
	if (state.templates == null) return;
	let newTemplates = [...state.templates];
	newTemplates.push(action.payload);
	state.templates = newTemplates;
};

export const updateServiceTemplateReducer = (
	state: serviceStateType,
	action: {
		payload: {
			id: number;
			serviceName?: string;
			defaultPrice?: number | null;
			collectAddress?: boolean;
			collectMobileNumber?: boolean;
			collectCompanyName?: boolean;
			addNote?: boolean;
			note?: string | null;
		};
	}
) => {
	if (state.templates == null) return;

	let tIndex = state.templates.findIndex(
		(t: ServiceTemplate) => t.id === action.payload.id
	);

	console.log("T index:", tIndex);
	if (tIndex === -1) return;

	console.log("Payload:", action.payload);

	let newTemplate = { ...state.templates[tIndex] };
	if (action.payload.serviceName !== undefined)
		newTemplate.serviceName = action.payload.serviceName;
	if (action.payload.defaultPrice !== undefined)
		newTemplate.defaultPrice = action.payload.defaultPrice;
	if (action.payload.collectCompanyName !== undefined)
		newTemplate.collectCompanyName = action.payload.collectCompanyName;
	if (action.payload.collectMobileNumber !== undefined)
		newTemplate.collectMobileNumber = action.payload.collectMobileNumber;
	if (action.payload.collectAddress !== undefined)
		newTemplate.collectAddress = action.payload.collectAddress;
	if (action.payload.addNote !== undefined)
		newTemplate.addNote = action.payload.addNote;
	if (action.payload.note !== undefined) newTemplate.note = action.payload.note;
	state.templates[tIndex] = newTemplate;
};
