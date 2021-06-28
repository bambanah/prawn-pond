import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import React from "react";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter&family=Poppins:wght@400;500;700&family=Roboto+Mono&family=Taviraj:wght@300;400&family=Patrick+Hand&display=swap"
						rel="stylesheet"
					/>
					{/* <link
						rel="preload"
						as="style"
						href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
						media="print"
						onLoad="this.media='all'"
					/> */}
					{/* <noscript></noscript> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
