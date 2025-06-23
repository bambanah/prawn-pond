import { AuthProvider, useAuth } from "@hooks/useAuth";
import GlobalStyle from "@shared/GlobalStyle";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { theme } from "@styles/theme";
import "@styles/globals.css";

function App({ Component, pageProps }: AppProps) {
	const { loadingAuthState } = useAuth();

	if (!loadingAuthState) {
		return (
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<Head>
						<title>Sean Wilson</title>
					</Head>
					<GlobalStyle />
					<Component {...pageProps} />
					<ToastContainer />
				</ThemeProvider>
			</AuthProvider>
		);
	}

	return <div>Loading...</div>;
}

export default App;
