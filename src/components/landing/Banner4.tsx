import React from "react";
import styles from "../../styles/Landing/Banner4.module.scss";
import Banner4Image from "../../../public/images/landing/banner4/banner4_image.jpg";
import Image from "next/image";
function Banner4() {
	return (
		<div className={styles.background}>
			<div className={styles.left}>
				<Image src={Banner4Image} alt="" fill style={{ objectFit: "cover" }} />
			</div>
			<div className={styles.right}>
				<div className={styles.contentContainer}>
					<p className={styles.question}>Why byteclass?</p>
					<h2 className={styles.subHeading}>Learning should never stop</h2>
					<p className={styles.msg}>
						In today's fast-paced world, learning should never stop. We believe
						that continuous education is the key to success, but we also
						recognise the challenges that come with it. That's why we've built
						this platform to provide you with the flexibility to learn at your
						own pace, without compromising on the quality of education.
						<br /> <br />
						Our vision is simple: to make learning forever accessible to
						everyone. With our platform, you can expand your knowledge and
						skills in short, concise formats that fit seamlessly into your busy
						schedule.
						<br /> <br />
						<span>~ Team byteclass :)</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Banner4;
