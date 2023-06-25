import React, { useState } from "react";
import styles from "../../styles/Landing/Banner1.module.scss";
import Margin from "../general/Margin";
import Banner1Hero from "./Banner1Hero";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowResize";
import LoadingIndicator from "../general/LoadingIndicator";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import EmailInput from "./EmailInput";

function Banner1({ setSuccess }: any) {
	return (
		<div className={styles.background}>
			<div className={styles.mainContainer}>
				<div className={styles.left}>
					<h1>Discover bite sized classes online</h1>
					<Margin height={30} />
					<p className={styles.subText}>
						Upgrade your skills by joining industry experts in short and concise
						online classes covering topics like design, marketing, tech and
						entrepreneurship.
					</p>

					<div className={styles.invitation}>
						Be among the first to get access to our classes!
					</div>
					<EmailInput isDark={false} setSuccess={setSuccess} />
				</div>
				<div className={styles.right}>
					<Banner1Hero />
				</div>
			</div>
		</div>
	);
}

export default Banner1;

{
	/* <button className={styles.discoverBtn}>
						<Link className={styles.link} href="/classes">
							Discover our classes
						</Link>
					</button> */
}
