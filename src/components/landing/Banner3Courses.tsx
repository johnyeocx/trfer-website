import React from "react";
import ClassCard from "../classes/ClassCard";
import { classData } from "../classes/classData";
import styles from "../../styles/Landing/Banner3/Banner3Classes.module.scss";
import { bpMobile } from "@/misc/constants";
import { useWindowSize } from "@/hooks/useWindowResize";

function Banner3Classes() {
	const { width, height } = useWindowSize();

	return (
		<div className={styles.container}>
			<ClassCard course={classData[0]["courses"][0]} />

			<ClassCard course={classData[0]["courses"][1]} />

			{width > 480 && (
				<>
					<ClassCard course={classData[0]["courses"][2]} />
					<ClassCard course={classData[0]["courses"][3]} />
				</>
			)}
		</div>
	);
}

export default Banner3Classes;
