import React, { useState } from "react";
import styles from "../../styles/Landing/Container1.module.scss";
import Margin from "../general/margin";
import Image from "next/image";
import BrowserFrame from "../../../public/images/browser_frame.png";
import TryArrow from "../../../public/images/container1/try_arrow.png";
import SamplePayment from "./SamplePayment";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";

function Container1() {
	const [focused, setFocused] = useState(false);
	return (
		<div className={styles.overallBackground}>
			<div className={styles.container1}>
				<div className={styles.left}>
					<h1 className={styles.text}>
						Say hello to the next <br />
						generation of <span className={styles.em1}>payments</span>,
						{/* Swapping words */}
					</h1>
					<Margin height={30} />
					<h2 className={styles.text}>
						Designed for
						<br /> the{" "}
						<span className={` ${styles.em1} ${styles.em2}`}>
							creative
						</span>{" "}
						industry.
					</h2>
					<Margin height={60} />
					<div
						className={`${styles.inputContainer} ${
							focused && styles.focusedContainer
						}`}
					>
						<input
							placeholder="Email"
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
						/>
						{/* <Input className={styles.input} placeholder="Email" /> */}
						<button className={styles.sendBtn}>Try it out!</button>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.background}>
						{/* <Image
							alt=""
							src={TryArrow}
							style={{ objectFit: "contain", objectPosition: "center" }}
							className={styles.tryImg}
						/> */}
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
			</div>
		</div>
	);
}

export default Container1;
