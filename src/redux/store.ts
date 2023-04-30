import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from "@reduxjs/toolkit";
import { Reducer } from "react";
import appSlice from "./appSlice";
import cusSlice from "./customer/cusSlice";
import subSlice from "./subscription/subSlice";
import userSlice from "./user/userSlice";

// const rootReducer = combineReducers({ auth });
// export type RootState = ReturnType<typeof rootReducer>;

// Reducer<CombinedState<{ auth: AuthState; }>

const store = configureStore({
	reducer: {
		app: appSlice,
		userState: userSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//   configureStore({
//     reducer: {
//       [authSlice.name]: authSlice.reducer,
//     },
//     devTools: true,
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	AppState,
// 	unknown,
// 	Action
// >;

// export const wrapper = createWrapper<AppStore>(makeStore);
