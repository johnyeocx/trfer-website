import React from "react";
import styles from "../../styles/Landing/Banner1/Banner1Hero.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Hero1Img from "../../../public/images/landing/banner1/hero1.jpg";
import Hero2Img from "../../../public/images/landing/banner1/hero2.png";
import ProfileImage from "../general/ProfileImage";
import {
	faArrowRight,
	faClock,
	faTag,
	faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { useWindowSize } from "@/hooks/useWindowResize";
import { bpDesktopThin1, bpDesktopThin2, bpTablet } from "@/misc/constants";
import UserImage from "../../../public/images/classes/people/1.jpg";

function Banner1Hero() {
	const { width, height } = useWindowSize();

	return (
		<div className={styles.mainContainer}>
			<div className={styles.image1}>
				<div className={styles.img1Container}>
					<Image
						src={Hero1Img}
						alt=""
						fill
						style={{ objectFit: "cover" }}
						sizes="100%"
					/>
				</div>
				<div className={styles.infoContainer}>
					<p className={styles.title}>Breaking into SEO</p>

					<div className={styles.infoRow}>
						<FontAwesomeIcon icon={faUser} className={styles.icon} />
						<p className={styles.text}>Amira Lee</p>
					</div>

					<div className={styles.infoRow}>
						<FontAwesomeIcon icon={faClock} className={styles.icon} />
						<p className={styles.text}>1h 30m</p>
					</div>

					<div className={styles.infoRow}>
						<FontAwesomeIcon icon={faTag} className={styles.icon} />
						<p className={styles.text}>£8.99</p>
					</div>
				</div>
			</div>

			<div className={styles.image2}>
				<Image
					priority={true}
					sizes="100%"
					src={Hero2Img}
					alt=""
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>

			<div className={styles.image3}>
				{(width > bpDesktopThin2 || width < bpTablet) && (
					<ProfileImage
						id={1}
						image={UserImage}
						dimension={
							width < bpTablet
								? 35
								: width < bpDesktopThin1
								? 25
								: width < bpDesktopThin2
								? 25
								: 30
						}
					/>
				)}

				<p className={styles.text1}>Design Workshop</p>
				<p className={styles.text2}>Today at 1.00pm</p>
				<button className={styles.joinBtn}>
					<p>Join Now</p>
					<FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
				</button>
			</div>
		</div>
	);
}

export default Banner1Hero;
