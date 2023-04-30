import React, { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import { SearchService } from "@/services/searchService";
import { ExploreResult } from "@/models/explore/exploreResults";
import { AuthService } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppTab, AuthStatus, setAppTab } from "@/redux/appSlice";
import ExploreResultCard from "@/components/explore/exploreResultCard";
import LoadingPage from "@/components/general/LoadingPage";
import styles from "../../styles/Explore/Explore.module.scss";
import Margin from "@/components/general/margin";
import { constants } from "buffer";
import { s3Endpoint } from "@/misc/constants";
import Image from "next/image";
import ProductModal from "@/components/explore/productModal";

function ExplorePage() {
	const showProductModal = useSelector(
		(state: RootState) => state.app.showProductModal
	);

	const data = [
		{
			title: "Toiletries",
			items: [
				{
					id: 1,
					name: "Toilet Paper",
					unitAmount: 2000,
					unitTitle: "24 rolls",
				},
				{
					id: 2,
					name: "Body Wash",
					unitAmount: 2000,
					unitTitle: "3 bottles",
				},
				{
					id: 3,
					name: "Shampoo",
					unitAmount: 2000,
					unitTitle: "3 bottles",
				},
				{
					id: 4,
					name: "Razors",
					unitAmount: 20.0,
					unitTitle: "Pack of 6",
				},
			],
		},
		{
			title: "Groceries",
			items: [
				{
					id: 4,
					name: "Coffee Beans",
					unitAmount: 2000,
					unitTitle: "100g",
				},
				{
					id: 5,
					name: "Coffee Pods",
					unitAmount: 2000,
					unitTitle: "12 pods",
				},
				{
					id: 6,
					name: "Tea",
					unitAmount: 2000,
					unitTitle: "5 tea bags",
				},
				{
					id: 7,
					name: "Beer",
					unitAmount: 2000,
					unitTitle: "Pack of 6 cans",
				},
				{
					id: 8,
					name: "Wine",
					unitAmount: 2000,
					unitTitle: "Bottle",
				},
			],
		},

		{
			title: "Fitness",
			items: [
				{
					id: 9,
					name: "Protein Powder",
					unitAmount: 2000,
					unitTitle: "200g container",
				},
				{
					id: 10,
					name: "Pre-Workout",
					unitAmount: 2000,
					unitTitle: "600g container",
				},
			],
		},
	];

	useEffect(() => {}, []);

	return (
		<div style={{ overflow: "scroll" }}>
			{showProductModal && <ProductModal />}
			<NavBar />
			<div className={styles.pageContainer}>
				<h3 className={styles.headerText}>Curate your subscription</h3>
				<Margin height={25} />
				<>
					{data.map((category) => (
						<div className={styles.catContainer}>
							<p className={styles.catTitle}>{category.title}</p>
							<div className={styles.itemsContainer}>
								{category.items.map((item) => (
									<ExploreResultCard item={item} />
									// <div className={styles.item}>
									// 	<p>{item.name}</p>
									// 	<ExploreProductImage pId={1} />
									// </div>
								))}
							</div>
						</div>
					))}
				</>
			</div>
			{/* <Margin height={20} />
			{exploreResults !== null &&
				exploreResults.map((res, index) => {
					return <ExploreResultCard result={res} key={index} />;
				})} */}
		</div>
	);
}

export default ExplorePage;

type ExploreProductImageProps = {
	pId: number;
};
const ExploreProductImage = ({ pId }: ExploreProductImageProps) => {
	const getProductImage = (id: number) => {
		return `${s3Endpoint}/revamp/products/${id}`;
	};
	return (
		<div
			style={{
				width: `${9.5}rem`,
				height: `${9}rem`,
				position: "relative",
				overflow: "hidden",
			}}
			className={styles.imageContainer}
		>
			<Image
				src={getProductImage(pId)}
				alt="Business Logo"
				fill
				style={{ objectFit: "cover" }}
				sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
			/>
		</div>
	);
};
