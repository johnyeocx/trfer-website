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
					content={`https://usual.s3.eu-west-2.amazonaws.com/user/profile_image/og_image.png`}
				/>
				<meta
					name="linkedin:image"
					content={`https://usual.s3.eu-west-2.amazonaws.com/user/profile_image/og_image.png`}
				/>
				<meta
					name="image"
					property="og:image"
					content={`https://usual.s3.eu-west-2.amazonaws.com/user/profile_image/og_image.png`}
				/>
				<meta
					name="image"
					property="linkedin:image"
					content={`https://usual.s3.eu-west-2.amazonaws.com/user/profile_image/og_image.png`}
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
