import React, { useEffect, useState } from "react";
import styles from "../styles/Landing.module.scss";
import HomeTextField from "@/components/home/HomeTextField";
import Margin from "@/components/general/margin";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/pro-solid-svg-icons";
import Screen from "../../public/profile.png";
import LandingImage from "../../public/images/landing_image.png";

export default function Root() {
	const [username, setUsername] = useState("");

	const router = useRouter();

	return (
		<>
			<NavBar />
			<div className={styles.page}>
				<div className={styles.contentContainer}>
					<p className={`${styles.fromThem} ${styles.textBubble}`}>
						What&apos;s your <span className={styles.cancel}>bank details</span>{" "}
						<span className={styles.title}>trfer.me</span>?
					</p>
					<Margin height={25} />

					<div className={`${styles.fromMe} ${styles.textBubble}`}>
						It's <HomeTextField value={username} onChange={setUsername} />
					</div>
					{/* <HomeTextField value={username} onChange={setUsername} /> */}
					<Margin height={25} />
					<div className={styles.btnsContainer}>
						<Link
							href={`/register?username=${username}`}
							className={styles.buttonContainer}
						>
							<FontAwesomeIcon icon={faArrowUp} className={styles.claimIcon} />
							<Margin width={10} />
							Claim it
						</Link>
					</div>
				</div>
				<Margin height={20} />
				<div className={styles.section2}>
					<p className={styles.subText}>
						Claim your link now and start getting paid the way you should -
						efficiently.
					</p>
					<Margin height={20} />
					<div className={styles.imageContainer}>
						<Image
							src={LandingImage}
							alt="apple logo"
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
				</div>
				<Margin height={35} />
				<div className={styles.section3}>
					<div
						className={`${styles.fromMe} ${styles.textBubble} ${styles.howTitle}`}
					>
						How does it work?
					</div>
					<Margin height={20} />
					<div
						className={`${styles.fromThem} ${styles.textBubble} ${styles.howText}`}
					>
						<p>
							<span>1.</span> Fill in the amount to send
						</p>
						<p>
							<span>2.</span> Authorise with your bank
						</p>
						<p>
							<span>3.</span> Done!
						</p>
					</div>
					<Margin height={20} />
					<p className={styles.section3End}>Safe, Simple, Secure.</p>
					<Margin height={20} />
					<Link
						href={`/register`}
						className={`${styles.buttonContainer} ${styles.section3Btn}`}
					>
						Try it now
					</Link>
				</div>
			</div>
		</>
	);
}
