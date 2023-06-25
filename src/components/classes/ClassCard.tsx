import React from "react";
import styles from "../../styles/Classes/ClassCard.module.scss";
import Image from "next/image";
import { s3Endpoint } from "@/misc/constants";
import ProfileImage from "../general/ProfileImage";
import Margin from "../general/Margin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTag } from "@fortawesome/pro-solid-svg-icons";

const getCourseImage = (id: number) => {
	return `${s3Endpoint}/class/card_image/${id}`;
};

export const timingDisplay = (hour: number, minute: number) => {
	let timingString = "";
	if (hour > 0) {
		timingString += `${hour} hour${hour > 1 ? "s" : ""}${
			minute > 0 ? " " : ""
		}`;
	}

	if (minute > 0) {
		timingString += `${minute} minute${minute > 1 && "s"} `;
	}

	return timingString;
};

import SocialMediaImage from "../../../public/images/classes/social_media.jpg";
import ChatGPT from "../../../public/images/classes/chatgpt.jpg";
import Programming from "../../../public/images/classes/programming.jpg";
import Wireframe from "../../../public/images/classes/wireframe.jpg";

function ClassCard({ course, index }: any) {
	const images = [SocialMediaImage, ChatGPT, Programming, Wireframe];
	return (
		<button className={styles.courseCard}>
			<div className={styles.cardImageContainer}>
				<Image
					sizes="100%"
					src={course.image}
					alt=""
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>

			<div className={styles.infoContainer}>
				{/* <Margin height={15} /> */}
				<p className={styles.courseTitle}>{course.title}</p>
				<Margin height={10} />
				<div className={styles.creatorRow}>
					<ProfileImage
						image={course.creatorImage}
						id={course.creatorId}
						dimension={20}
					/>
					<Margin width={10} />
					<p>{course.creatorName}</p>
				</div>
				<Margin height={10} />
				<div className={styles.infoRow}>
					<FontAwesomeIcon icon={faClock} className={styles.icon} />
					<Margin width={10} />
					<p>{timingDisplay(course.hour, course.minute)}</p>
				</div>

				<Margin height={10} />
				<div className={styles.infoRow}>
					<FontAwesomeIcon icon={faTag} className={styles.icon} />
					<Margin width={10} />
					<p>{course.price == 0 ? "Free" : course.price}</p>
				</div>
			</div>
		</button>
	);
}

export default ClassCard;
