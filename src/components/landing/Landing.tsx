import React, { useState } from "react";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import Head from "next/head";
import Banner3 from "./Banner3";
import Banner4 from "./Banner4";
import Banner5 from "./Banner5";
import SignedUpModal from "./SignedUpModal";

function Landing() {
	const [emailSuccess, setEmailSuccess] = useState(false);
	return (
		<>
			<Head>
				<title>Byteclass | Short, live, online classes</title>
			</Head>
			<div>
				{emailSuccess && <SignedUpModal setSuccess={setEmailSuccess} />}
				<Banner1 setSuccess={setEmailSuccess} />
				<Banner2 />
				<Banner3 />
				<Banner4 />
				<Banner5 setSuccess={setEmailSuccess} />
			</div>
		</>
	);
}

export default Landing;
