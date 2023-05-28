import React, { useState } from "react";
import styles from "../../styles/Landing/Container5.module.scss";
import { Input } from "antd";
import AuthTextField from "../auth/authTextField";
import Margin from "../general/margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import LoadingIndicator from "../general/LoadingIndicator";
import { bpDesktopThin, bpMobile } from "@/misc/constants";
import { useWindowSize } from "@/hooks/useWindowResize";

function Container5({ submitClicked, failed, error }: any) {
	const [email, setEmail] = useState("");
	const [focused, setFocused] = useState(false);
	const [loading, setLoading] = useState(false);
	const { width, height } = useWindowSize();

	return (
		<div className={styles.background}>
			<div className={styles.container5}>
				<div className={styles.left}>
					Start spending less time on{" "}
					<span className={styles.word1}>payments</span>,{" "}
					{width >= bpMobile && <br />}
					and more on the things you <span className={styles.word2}>love</span>.
				</div>
				{/* <Margin height={15} /> */}
				<div className={styles.right}>
					<p className={styles.inputTitle}>
						Get access to the beta version now.
					</p>
					<Margin height={10} />
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
								await submitClicked(email);
								setLoading(false);
							}}
							className={styles.sendBtn}
						>
							{loading ? <LoadingIndicator /> : <>Try it out!</>}
						</button>
					</div>
					{/* <div className={styles.inputContainer}>
						<Input className={styles.input} placeholder="Email" />
						<button className={styles.sendBtn}>
							Request
							<FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Container5;
