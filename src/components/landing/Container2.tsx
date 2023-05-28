import React from "react";
import styles from "../../styles/Landing/Container2.module.scss";
import Margin from "../general/margin";
import Image from "next/image";
import LowFeesImage from "../../../public/images/low_fees.png";
import HowItWorks from "../../../public/images/container2/how_it_works.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faPersonSeatReclined,
} from "@fortawesome/pro-solid-svg-icons";

function Container2() {
	return (
		<div className={styles.overallBackground}>
			<div className={styles.container2}>
				<div className={styles.left}>
					<h1 className={styles.title}>Low transaction fees</h1>
					<Margin height={20} />
					<p className={styles.subTitle}>
						With Open Banking, we&apos;ve gotten rid of card networks and
						payment processors. Say goodbye to high commission rates!
					</p>
					<Margin height={50} />
					<div className={styles.pointContainer}>
						<div className={styles.iconContainer}>
							<FontAwesomeIcon icon={faPersonSeatReclined} />
						</div>
						<div className={styles.textContainer}>
							<p className={styles.title}>A seamless experience</p>
							<p className={styles.description}>
								No more rushing to get credit cards or typing in account
								numbers. All your client has to do is select their bank and
								authorise!
							</p>
						</div>
					</div>
					<Margin height={50} />
					<div className={`${styles.pointContainer} ${styles.pointContainer2}`}>
						<div className={styles.iconContainer}>
							<FontAwesomeIcon icon={faPersonSeatReclined} />
						</div>
						<div className={styles.textContainer}>
							<p className={styles.title}>Safe and secure</p>
							<p className={styles.description}>
								Transactions must be approved on the client&apos;s personal
								devices, with their mobile banking app.
							</p>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.background}>
						<div className={styles.imgContainer}>
							<Image
								alt=""
								src={HowItWorks}
								fill
								style={{ objectFit: "contain" }}
								className={styles.img}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Container2;
