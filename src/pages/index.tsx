import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Landing.module.scss";
import HomeTextField from "@/components/home/HomeTextField";
import Margin from "@/components/general/margin";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import NavBar from "@/components/general/Nav/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/pro-solid-svg-icons";
import Screen from "../../public/profile.png";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import { useDispatch } from "react-redux";
import LandingImage from "../../public/images/sample_payment_page.png";
import BrowserFrame from "../../public/images/browser_frame.png";
import Container2 from "@/components/landing/Container2";
import SamplePayment from "@/components/landing/SamplePayment";
import Container3 from "@/components/landing/Container3";
import Container4 from "@/components/landing/Container4";
import Container5 from "@/components/landing/Container5";
import Container1 from "@/components/landing/Container1";
import SignedUpModal from "@/components/landing/SignedUpModal";
import { useScrollBlock } from "@/hooks/useScrollBlock";

const safeDocument = typeof document !== "undefined" ? document : {};

export default function Root() {
	const [username, setUsername] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();
	const [success, setSuccess] = useState(false);
	const [blockScroll, allowScroll] = useScrollBlock();
	const [failed, setFailed] = useState(false);
	const [errText, setErrText] = useState("");

	useEffect(() => {
		(async () => {
			await GenFuncs.initPage(dispatch, router, null, true);
		})();
	}, []);

	useEffect(() => {
		if (success) {
			blockScroll();
		} else {
			allowScroll();
		}
	}, [success]);

	const submitClicked = async (email: string) => {
		if (email == "") {
			setErrText("Please provide an email");
			setFailed(true);
			setTimeout(() => {
				setFailed(false);
			}, 5000);
			return;
		}

		if (!GenFuncs.isEmailValid(email)) {
			setErrText("Invalid email provided");
			setFailed(true);
			setTimeout(() => {
				setFailed(false);
			}, 5000);
			return;
		}

		setFailed(false);
		try {
			const response = await fetch("/api/submit", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
			});

			if (response.status != 200) throw "Failed";
			setSuccess(true);
			// setTimeout(() => setSuccess(false), 10000);
			return;
		} catch (error) {
			console.log("failed to submit");
			setFailed(true);
			setErrText("Something went wrong. Please try again later.");

			setTimeout(() => {
				setFailed(false);
			}, 5000);
		}
	};

	return (
		// <div style={success ? { overflow: "hidden" } : {}}>
		<>
			<NavBar showRight={false} />
			{success && <SignedUpModal setSuccess={setSuccess} />}
			<div className={styles.page}>
				<Container1
					errText={errText}
					failed={failed}
					submitClicked={submitClicked}
				/>
				<Container2 />
				<Container3 />
				<Container4 />
				<Container5
					submitClicked={submitClicked}
					errText={errText}
					failed={failed}
				/>
			</div>
		</>
	);
}
