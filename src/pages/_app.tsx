import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
	const { loadingAuthState } = useAuth();

	if (!loadingAuthState) {
		return (
			<AuthProvider>
				<Head>
					<title>Sean Wilson</title>
				</Head>
				<Component {...pageProps} />
				<ToastContainer />
			</AuthProvider>
		);
	}

	return <div>Loading...</div>;
}

export default App;
