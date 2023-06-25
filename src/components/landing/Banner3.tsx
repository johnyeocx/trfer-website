import React from "react";
import styles from "../../styles/Landing/Banner3.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChartSimple,
	faListCheck,
	faMicrochip,
	faObjectGroup,
} from "@fortawesome/pro-solid-svg-icons";
import Margin from "../general/Margin";
import Banner3Classes from "./Banner3Courses";
import { useWindowSize } from "@/hooks/useWindowResize";
import { bpMobile } from "@/misc/constants";

function Banner3() {
	const { width, height } = useWindowSize();

	return (
		<div className={styles.background}>
			<div className={styles.mainContainer}>
				<div className={styles.left}>
					<h2 className={styles.subHeading}>
						Unlock a world of learning across diverse subjects
					</h2>
					<div className={styles.row}>
						<SubjectContainer
							icon={faChartSimple}
							title="Marketing"
							text="Learn about SEO, social media and digital marketing to bring
								your business a new level of awareness"
						/>
						{/* <Margin width={100} /> */}
						<SubjectContainer
							icon={faObjectGroup}
							title="Design"
							text="With lessons on website, wireframe & UI/UX design, bring your projects to a new level of aesthetics"
						/>
					</div>

					<div className={styles.row}>
						<SubjectContainer
							icon={faMicrochip}
							title="Tech"
							text="Learn about the latest tools and technologies to supercharge your business and achieve new levels of efficiencies"
						/>
						{/* <Margin width={100} /> */}
						<SubjectContainer
							icon={faListCheck}
							title="Business"
							text="Learn about breaking into industries, managing teams and best practices for advancing your business or career"
						/>
					</div>
				</div>

				<div className={styles.right}>
					<Banner3Classes />
				</div>
			</div>
		</div>
	);
}

export default Banner3;

export const SubjectContainer = ({ icon, title, text }: any) => {
	return (
		<div className={styles.subjectContainer}>
			<div className={styles.subjectHeading}>
				<FontAwesomeIcon icon={icon} className={styles.icon} />
				<p className={styles.title}>{title}</p>
			</div>

			<p className={styles.subjectDescription}>{text}</p>
		</div>
	);
};
