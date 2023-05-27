import React from "react";
import styles from "../../styles/Landing/Container3.module.scss";
import PaidOnTime from "../../../public/images/paid_on_time.png";
import ToBank from "../../../public/images/container3/to_bank.png";
import Efficiency from "../../../public/images/efficiency.png";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowResize";
import { bpMobile } from "@/misc/constants";

function Container3() {
	const { width, height } = useWindowSize();
	return (
		<div className={styles.overallBackground}>
			{/* <div className={styles.container3}> */}
			<div className={styles.row}>
				<div className={`${styles.imgHalf} ${styles.imgLeft}`}>
					<div className={styles.imgContainer}>
						<Image
							src={PaidOnTime}
							alt=""
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
				</div>
				<div className={`${styles.textHalf} ${styles.right}`}>
					<p className={styles.title}>Get paid on time</p>
					<p className={styles.description}>
						With trfer.me, clients will never have an easier time paying, and
						we&apos;ve done the research: A simpler process goes a long way in
						helping you get paid on time.
					</p>
				</div>
			</div>

			{/*  */}
			<div className={styles.row}>
				{width < bpMobile && (
					<div
						className={`${styles.imgHalf} ${styles.right} ${styles.imgRight}`}
					>
						<div className={styles.imgContainer}>
							<Image
								src={ToBank}
								alt=""
								fill
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>
				)}
				<div className={`${styles.textHalf} ${styles.textLeft}`}>
					<p className={styles.title}>Straight to your bank</p>
					<p className={styles.description}>
						Stop dealing with long pay out times. Using trfer.me, money travels
						from their bank to your bank, and nowhere else in between. Start
						improving your cashflow now.
					</p>
				</div>
				{width >= bpMobile && (
					<div
						className={`${styles.imgHalf} ${styles.right} ${styles.imgRight}`}
					>
						<div className={styles.imgContainer}>
							<Image
								src={ToBank}
								alt=""
								fill
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>
				)}
			</div>
			<div className={styles.row}>
				<div className={`${styles.imgHalf} ${styles.imgLeft}`}>
					<div className={styles.imgContainer}>
						<Image
							src={Efficiency}
							alt=""
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
				<div className={`${styles.textHalf} ${styles.right}`}>
					<p className={styles.title}>
						Efficient payments, <br />
						time saved
					</p>
					<p className={styles.description}>
						Tired of long email threads and tedious collection processes?
						That&apos;s why we&apos;ve reduced payments to just the key
						essentials, because your time is worth so much more.
					</p>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
}

export default Container3;
