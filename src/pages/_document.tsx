import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content="#FFF" />
				<title>trfer.me</title>
				<link rel="shortcut icon" href="/static/favicon.ico" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
