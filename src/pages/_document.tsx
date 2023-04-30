import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content="#FFF" />
				<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
