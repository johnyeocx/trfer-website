import { s3Endpoint } from "@/misc/constants";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content="#FFF" />
				<title>trfer.me</title>
				<link rel="shortcut icon" href="/logo.png" />
				<meta
					property="og:title"
					content="Reduce your transaction fees with trfer.me"
				/>
				<meta
					property="og:description"
					content="An open banking payment service designed for creative agencies"
				/>
				<meta
					name="og:image"
					content={`${s3Endpoint}/user/profile_image/banner.png`}
				/>

				{/* <meta property="og:image" content="URL of the desired image" /> */}
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
