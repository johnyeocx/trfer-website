import React, { useRef, useState } from "react";
import styles from "../../../styles/Home/Account/Details.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTypewriter } from "@fortawesome/pro-solid-svg-icons";
import Margin from "@/components/general/margin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { UserFuncs } from "@/models/user/User";

type DetailsProps = {};

function Details({}: DetailsProps) {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.userState.user);

	return (
		<div className={styles.mainContainer}>
			<Margin height={12} />
			<div className={styles.outerImgContainer}>
				<div className={styles.imgContainer}>
					<Image
						alt="User Image"
						src={UserFuncs.imagePath(user!)}
						fill
						style={{ objectFit: "cover" }}
						className={styles.image}
					/>
				</div>
				<Margin width={20} />
				<div className={styles.detailsContainer}>
					<p className={styles.name}>{UserFuncs.fullName(user!)}</p>
					<p className={styles.username}>{user?.username}</p>
				</div>
			</div>
			<button
				onClick={() => {
					router.push("/home/account");
				}}
			>
				<FontAwesomeIcon icon={faPenToSquare} className={styles.editIcon} />
			</button>
		</div>
	);
}

export default Details;

export const UserInfo = ({ title, content }: any) => {
	const [value, setValue] = useState(content);
	const [editting, setEditting] = useState(false);
	const inputRef = useRef(null);
	return (
		<div className={`${styles.infoContainer} ${editting && styles.editting}`}>
			{/* <p className={styles.infoTitle}>{title}</p> */}
			<p className={styles.infoTitle}>{title}: </p>
			<div className={styles.right}>
				<p className={styles.content}>{content}</p>
				<FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
			</div>
		</div>
	);
};
