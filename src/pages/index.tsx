import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Landing.module.scss";
import { useRouter } from "next/router";
import NavBar from "@/components/general/Nav/NavBar";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import { useDispatch } from "react-redux";
import Container2 from "@/components/landing/Container2";
import Container3 from "@/components/landing/Container3";
import Container4 from "@/components/landing/Container4";
import Container5 from "@/components/landing/Container5";
import Container1 from "@/components/landing/Container1";
import SignedUpModal from "@/components/landing/SignedUpModal";
import { useScrollBlock } from "@/hooks/useScrollBlock";

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

	const submitClicked = async (email: string, setEmail: any) => {
		setFailed(false);

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
			setEmail("");
			return;
		} catch (error) {
			console.log("failed to submit:", error);
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
