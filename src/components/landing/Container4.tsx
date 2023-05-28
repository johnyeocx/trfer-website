import React, { useState } from "react";
import styles from "../../styles/Landing/Container4.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChartSimple,
	faFile,
	faLink,
} from "@fortawesome/pro-solid-svg-icons";
import Margin from "../general/margin";

import TemplateView from "../../../public/images/container4/template_view.png";
import CustomView from "../../../public/images/container4/custom_view.png";
import TrackingView from "../../../public/images/container4/tracking_view.png";
import Image from "next/image";

enum FeatureTab {
	template,
	customLink,
	tracking,
}
function Container4() {
	const [tab, setTab] = useState(FeatureTab.template);

	return (
		<div className={styles.container4}>
			{/* <h1>Features</h1> */}

			{/* <div className={styles.left}> */}
			<h1 className={styles.title}>Features</h1>
			<Margin height={30} />
			<div className={styles.control}>
				<button
					className={`${styles.tab} ${
						tab == FeatureTab.template && styles.selectedTab
					}`}
					onClick={() => setTab(FeatureTab.template)}
				>
					<FontAwesomeIcon icon={faFile} className={styles.icon} />
					<p>Template</p>
				</button>
				<button
					className={`${styles.tab} ${
						tab == FeatureTab.customLink && styles.selectedTab
					}`}
					onClick={() => setTab(FeatureTab.customLink)}
				>
					<FontAwesomeIcon icon={faLink} className={styles.icon} />
					<p>Custom Links</p>
				</button>
				<button
					className={`${styles.tab} ${
						tab == FeatureTab.tracking && styles.selectedTab
					}`}
					onClick={() => setTab(FeatureTab.tracking)}
				>
					<FontAwesomeIcon icon={faChartSimple} className={styles.icon} />
					<p>Tracking</p>
				</button>
			</div>

			{tab == FeatureTab.template ? (
				<TemplateContent />
			) : tab == FeatureTab.customLink ? (
				<CustomContent />
			) : (
				<TrackingContent />
			)}
			{/* </div> */}
		</div>
	);
}

export default Container4;

const TemplateContent = () => {
	return (
		<div className={styles.overallBackground}>
			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<p>
						Create templates for each service that you offer, then customise the
						way that you want to take payments for that service.
					</p>
				</div>
				<div className={styles.imgContainer}>
					<Image
						src={TemplateView}
						alt=""
						fill
						style={{ objectFit: "contain" }}
						className={styles.img}
					/>
				</div>
			</div>
		</div>
	);
};

const CustomContent = () => {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.content}>
				<p>
					Using your templates, create personalised links for certain clients
					with customisable payment amounts and prefilled inputs.
				</p>
			</div>
			<div className={styles.imgContainer}>
				<Image
					src={CustomView}
					alt=""
					fill
					style={{ objectFit: "contain" }}
					className={styles.img}
				/>
			</div>
		</div>
	);
};

const TrackingContent = () => {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.content}>
				<p>
					Access a suite of analytics to help you make the best decisions for
					your business. You can also link the data to external tools like
					Google Sheets.
				</p>
			</div>
			<div className={styles.imgContainer}>
				<Image
					src={TrackingView}
					alt=""
					fill
					style={{ objectFit: "contain" }}
					className={styles.img}
				/>
			</div>
		</div>
	);
};
