import React, { useState } from "react";
import styles from "../../styles/Landing/Banner5.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Margin from "../general/Margin";
import Link from "next/link";
import EmailInput from "./EmailInput";

function Banner5({ setSuccess }: any) {
	const [email, setEmail] = useState("");
	const [focused, setFocused] = useState(false);
	return (
		<div className={styles.background}>
			<div className={styles.mainContainer}>
				<div className={styles.container1}>
					<h2>
						We are launching soon! Join the waitlist now to be the first to
						access our classes.
						{/* Join your first class now and embark on a transformative learning
						journey. */}
					</h2>
					<div className={styles.inputContainer}>
						{/* <p className={styles.invitation}>
							Join the waitlist to get access when we launch!
						</p> */}
						<EmailInput
							email={email}
							setEmail={setEmail}
							isDark
							setSuccess={setSuccess}
						/>
						{/* <Link href="/" className={`${styles.actionBtn} ${styles.joinBtn}`}>
							Join as a creator
						</Link>
						<Link href="/classes" className={styles.actionBtn}>
							Check out our courses
						</Link> */}
					</div>
				</div>
				<div className={styles.divider}></div>

				<div className={styles.container2}>
					<div className={styles.col1}>
						<div className="logo">byteclass</div>
						{/* <Margin height={15} />
						<div className={styles.socialsRow}>
							<button className={styles.socialsBtn}>
								<FontAwesomeIcon icon={faInstagram} />
							</button>
							<button className={styles.socialsBtn}>
								<FontAwesomeIcon icon={faLinkedin} />
							</button>
							<button className={styles.socialsBtn}>
								<FontAwesomeIcon icon={faTwitter} />
							</button>
						</div> */}
					</div>
					<div className={styles.col2}>
						<p>Get in touch</p>
						<Margin height={15} />
						<p className={styles.text}>
							58 Penywern Road <br /> United Kingdom
						</p>
						<Margin height={15} />
						<Link href="email" className={styles.emailLink}>
							team@byteclass.co
						</Link>
					</div>
					<div className={styles.col3}></div>
				</div>
			</div>
		</div>
	);
}

export default Banner5;
