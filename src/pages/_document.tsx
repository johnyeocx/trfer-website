import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content="#FFF" />
				<title>trfer.me</title>
				<link rel="shortcut icon" href="/logo.png" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
