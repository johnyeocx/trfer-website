import { createSlice } from "@reduxjs/toolkit";
import {
	addServiceTemplateReducer,
	setServiceTemplatesReducer,
	updateServiceTemplateReducer,
} from "./serviceReducer";
import { ServiceTemplate } from "@/models/service/ServiceTemplate";

export type serviceStateType = {
	templates: Array<ServiceTemplate> | null;
};

const getInitialState = (): serviceStateType => {
	return {
		templates: null,
	};
};
// create a slice
export const serviceSlice = createSlice({
	name: "serviceState",
	initialState: getInitialState(),

	reducers: {
		setServiceTemplates(state, action) {
			setServiceTemplatesReducer(state, action);
		},
		addServiceTemplate(state, action) {
			addServiceTemplateReducer(state, action);
		},

		updateServiceTemplate(state, action) {
			updateServiceTemplateReducer(state, action);
		},
	},
});

export const {
	setServiceTemplates,
	addServiceTemplate,
	updateServiceTemplate,
} = serviceSlice.actions;
export default serviceSlice.reducer;
