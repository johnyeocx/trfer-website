import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../redux/store";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/misc/firebase_config";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
