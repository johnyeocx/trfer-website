import React from "react";
import styles from "../../styles/Classes/Classes.module.scss";
import { classData } from "./classData";
import { s3Endpoint } from "@/misc/constants";
import Image from "next/image";
import ProfileImage from "../general/ProfileImage";
import Margin from "../general/Margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClock,
	faDollarCircle,
	faTag,
	faCoffee,
	faChevronRight,
} from "@fortawesome/pro-regular-svg-icons";
import ClassCard from "./ClassCard";

function Classes() {
	return (
		<main className={styles.mainContainer}>
			<div className={styles.contentContainer}>
				<h1 className={styles.header}>We are launching soon!</h1>
				<Margin height={20} />
				<p>
					Thank you for checking out byteclass. We are launching soon and look
					forward to bringing you on a journey of learning!
				</p>
			</div>

			{/* <div className={styles.navProgress}>
				<FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
				<Margin width={15} />
				<h1 className={`${styles.heading} ${styles.text}`}>Classes</h1>
			</div>

			<div>
				{classData.map((cat: any) => (
					<div className={styles.catContainer}>
						<p className={styles.catTitle}>{cat.title}</p>
						<div className={styles.coursesContainer}>
							{cat.courses.map((course: any) => (
								<ClassCard course={course} />
							))}
						</div>
					</div>
				))}
			</div> */}
		</main>
	);
}

export default Classes;
