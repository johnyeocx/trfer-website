import React from "react";
import styles from "../../styles/Landing/Container5.module.scss";
import { Input } from "antd";
import AuthTextField from "../auth/authTextField";
import Margin from "../general/margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";

function Container5() {
	return (
		<div className={styles.background}>
			<div className={styles.container5}>
				<div className={styles.left}>
					Start spending less time on{" "}
					<span className={styles.word1}>payments</span>, <br />
					and more on the things you <span className={styles.word2}>love</span>.
				</div>
				<Margin height={30} />
				<div className={styles.right}>
					<p className={styles.inputTitle}>
						Get access to the beta version of the service now.
					</p>
					<Margin height={10} />
					<div className={styles.inputContainer}>
						<Input className={styles.input} placeholder="Email" />
						<button className={styles.sendBtn}>
							Request
							<FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Container5;
