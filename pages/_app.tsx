import { AuthProvider, useAuth } from "@Hooks/useAuth";
import GlobalStyle from "@Shared/GlobalStyle";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

const theme = {
	colors: {
		fg: "#414141",
		bg: "#fafcff",
		pastelPink: "#ffebe7",
		pastelGreen: "#ebfcf6",
		pastelBlue: "#e0edfd",
		link: "#3273dc",
		brand: "#075252",
		error: "#ff6961",
		accent: "#7ac5d8",
		accentGradient:
			"linear-gradient(24deg, rgba(126,249,145,1) 0%, rgba(120,199,254,1) 100%)",
		transparentAccent:
			"linear-gradient(24deg, rgba(126,249,145,0.5) 0%, rgba(120,199,254,0.5) 100%)",
	},
	fonts: {
		cursive: "Patrick Hand",
		monospace: "Roboto Mono",
		display: "Taviraj",
		serif: "Poppins",
		sansSerif: "Inter",
	},
};

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
