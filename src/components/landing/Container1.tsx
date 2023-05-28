import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/Landing/Container1.module.scss";
import Margin from "../general/margin";
import Image from "next/image";
import BrowserFrame from "../../../public/images/browser_frame.png";

import SamplePayment from "./SamplePayment";

import { useWindowSize } from "@/hooks/useWindowResize";
import LoadingIndicator from "../general/LoadingIndicator";
import Fade from "react-reveal/Fade";

type Container1Props = {
	submitClicked: (email: string, setEmail: any) => Promise<void>;
	failed: boolean;
	errText: string;
};
function Container1({ submitClicked, failed, errText }: Container1Props) {
	const [focused, setFocused] = useState(false);
	const { width, height } = useWindowSize();

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");

	return (
		<div className={styles.overallBackground}>
			<div className={styles.container1}>
				<Fade left>
					<div className={`${styles.left}`}>
						<h1>
							<span className={`${styles.em1} ${styles.em2}`}>Payments</span>{" "}
							made
							{/* {width >= bpDesktopThin && <br />}  */} for{" "}
							<span className={styles.em1}>creative</span> agencies
						</h1>
						<Margin height={20} />
						<p>
							Whether you&apos;re looking for an alternative to high commision
							card payments, or to upgrade from traditional bank transfers,
							we&apos;ve got you covered.
						</p>
						<Margin height={40} />
						<div
							className={`${styles.inputContainer} ${
								focused && styles.focusedContainer
							} ${failed && styles.failedContainer}`}
						>
							<input
								placeholder="Email"
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button
								onClick={async () => {
									setLoading(true);
									await submitClicked(email, setEmail);
									setLoading(false);
								}}
								className={styles.sendBtn}
							>
								{loading ? <LoadingIndicator /> : <>Try it out!</>}
							</button>
						</div>
						{failed && <p className={styles.failedTxt}>{errText}</p>}
					</div>
				</Fade>
				<Fade right>
					<div className={styles.right}>
						<div className={styles.background}>
							<div className={styles.imgContainer}>
								<Image
									alt=""
									src={BrowserFrame}
									fill
									style={{ objectFit: "contain", objectPosition: "center" }}
									className={styles.img}
								/>
								<SamplePayment />
							</div>
						</div>
					</div>
				</Fade>
			</div>
		</div>
	);
}

export default Container1;
