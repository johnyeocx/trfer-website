import React, { useEffect, useState } from "react";
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

export default function Root() {
	const [username, setUsername] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await GenFuncs.initPage(dispatch, router, null, true);
		})();
	}, []);

	return (
		<>
			<NavBar showRight={false} />
			<div className={styles.page}>
				<Container1 />

				<Container2 />
				<Container3 />
				<Container4 />
				<Container5 />

				{/* <div className={styles.container2}>
					<div>Is this you?</div>
				</div> */}
			</div>
		</>
	);
}

// <div className={styles.contentContainer}>
// 					<p className={`${styles.fromThem} ${styles.textBubble}`}>
// 						What&apos;s your <span className={styles.cancel}>bank details</span>{" "}
// 						<span className={styles.title}>trfer.me</span>?
// 					</p>
// 					<Margin height={25} />

// 					<div className={`${styles.fromMe} ${styles.textBubble}`}>
// 						It&apos;s <HomeTextField value={username} onChange={setUsername} />
// 					</div>
// 					<Margin height={25} />
// 					<div className={styles.btnsContainer}>
// 						<Link
// 							href={`/register?username=${username}`}
// 							className={styles.buttonContainer}
// 						>
// 							<FontAwesomeIcon icon={faArrowUp} className={styles.claimIcon} />
// 							<Margin width={10} />
// 							Claim it
// 						</Link>
// 					</div>
// 				</div>
// 				<Margin height={20} />
// 				<div className={styles.section2}>
// 					<p className={styles.subText}>
// 						Claim your link now and start getting paid the way you should -
// 						efficiently.
// 					</p>
// 					<Margin height={20} />
// 					<div className={styles.imageContainer}>
// 						<Image
// 							src={LandingImage}
// 							alt="apple logo"
// 							fill
// 							style={{ objectFit: "contain" }}
// 						/>
// 					</div>
// 				</div>
// 				<Margin height={35} />
// 				<div className={styles.section3}>
// 					<div
// 						className={`${styles.fromMe} ${styles.textBubble} ${styles.howTitle}`}
// 					>
// 						How does it work?
// 					</div>
// 					<Margin height={20} />
// 					<div
// 						className={`${styles.fromThem} ${styles.textBubble} ${styles.howText}`}
// 					>
// 						<p>
// 							<span>1.</span> Fill in the amount to send
// 						</p>
// 						<p>
// 							<span>2.</span> Authorise with your bank
// 						</p>
// 						<p>
// 							<span>3.</span> Done!
// 						</p>
// 					</div>
// 					<Margin height={20} />
// 					<p className={styles.section3End}>Safe, Simple, Secure.</p>
// 					<Margin height={20} />
// 					<Link
// 						href={`/register`}
// 						className={`${styles.buttonContainer} ${styles.section3Btn}`}
// 					>
// 						Try it now
// 					</Link>
// 				</div>
