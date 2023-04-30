import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import AuthTextField from "@/components/auth/authTextField";
import HomeTextField from "@/components/home/HomeTextField";
import MyButton from "@/components/general/MyButton";
import Margin from "@/components/general/margin";
import HomeButton from "@/components/home/HomeButton";
import Image from "next/image";
import Screen from "../../public/profile.png";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Root() {
	const [username, setUsername] = useState("");

	const router = useRouter();

	return (
		<div className={styles.page}>
			{/* <PlaidLink
				token="link-sandbox-896cbe5a-9c85-46d4-bd59-0b18631168c5"
				onSuccess={() => {}}
			>
				Pay now
			</PlaidLink> */}

			<div className={styles.contentContainer}>
				<h1 className={styles.landingText}>
					What's your <span className={styles.cancel}>bank details</span>{" "}
					<span className={styles.title}>trfer.me</span>?
				</h1>
				<Margin height={10} />
				<p className={styles.subText}>
					Claim your link now and start getting paid the way you should -
					efficiently.
				</p>
				<Margin height={30} />
				<HomeTextField value={username} onChange={setUsername} />
				<Margin height={30} />
				<Link
					href={`/register?username=${username}`}
					className={styles.buttonContainer}
				>
					Let's Go!
				</Link>
			</div>
			<Margin height={50} />

			<div className={styles.imageContainer}>
				<Image
					src={Screen}
					alt="apple logo"
					fill
					style={{ objectFit: "contain" }}
				/>
			</div>
		</div>
	);
}
