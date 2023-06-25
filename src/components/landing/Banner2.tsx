import React from "react";
import styles from "../../styles/Landing/Banner2.module.scss";
import Image from "next/image";
import Banner2Image from "../../../public/images/landing/banner2/banner2_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGlobe,
	faHandsHelping,
	faPersonSeat,
} from "@fortawesome/pro-regular-svg-icons";
import { useWindowSize } from "@/hooks/useWindowResize";
import { bpTablet } from "@/misc/constants";

function Banner2() {
	const { width, height } = useWindowSize();
	return (
		<div className={styles.background}>
			<div className={styles.mainContainer}>
				{width > bpTablet && (
					<div className={styles.left}>
						<div className={styles.imgContainer}>
							<Image
								src={Banner2Image}
								alt=""
								fill
								style={{ objectFit: "contain" }}
								className={styles.img}
							/>
						</div>
					</div>
				)}

				<div className={styles.right}>
					<h2 className={styles.subHeading}>
						Upgrade your skills or discover new passions the right way, at the
						right time
					</h2>

					<PointContainer
						icon={faPersonSeat}
						iconScale="1.2"
						title="Convenient access"
						text="With byteclass, all you need is the vigour to learn and an
								internet connection. Leave the rest to us."
					/>

					<PointContainer
						icon={faHandsHelping}
						iconScale="1.0"
						title="Accountability"
						text="Immediate feedback, structured classes and real-time interaction. All the things you need to stay engaged."
					/>

					<PointContainer
						icon={faGlobe}
						title="Networking Opportunities"
						text="We don't just want you to listen or watch. We want you to interact, because that's how learning should be."
					/>
				</div>

				{width <= bpTablet && (
					<div className={styles.left}>
						<div className={styles.imgContainer}>
							<Image
								src={Banner2Image}
								alt=""
								fill
								style={{ objectFit: "contain" }}
								className={styles.img}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Banner2;

const PointContainer = ({ title, text, icon, iconScale = 1 }: any) => {
	return (
		<div className={styles.pointContainer}>
			<div className={styles.iconContainer}>
				<FontAwesomeIcon
					style={{ transform: `scale(${iconScale})` }}
					icon={icon}
					className={styles.icon}
				/>
			</div>
			<div className={styles.infoContainer}>
				<p className={styles.title}>{title}</p>
				<p className={styles.text}>{text}</p>
			</div>
		</div>
	);
};
