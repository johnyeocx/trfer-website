import { Business } from "@/models/business/business";
import { ProductFuncs } from "@/models/sub_product/product";
import { SubProduct } from "@/models/sub_product/subProduct";
import { BusinessService } from "@/services/businessService";
import { SubProductService } from "@/services/subProductService";
import Image from "next/image";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Subscription() {
	const router = useRouter();
	const [subProduct, setSubProduct] = useState<SubProduct | null>(null);
	const [business, setBusiness] = useState<Business | null>(null);

	const getSubProductData = async (pId: number) => {
		const subProduct = await SubProductService.getSubProductData(pId);
		if (!subProduct) return;
		setSubProduct(subProduct);
		const business = await BusinessService.getBusiness(
			subProduct.product.businessId
		);
		if (business) {
			setBusiness(business);
		}
	};

	useEffect(() => {
		const { pId } = router.query;
		if (pId === undefined) return;

		const pIdInt = +pId;
		getSubProductData(pIdInt);
	}, [router]);

	if (subProduct === null || business == null) {
		return <div>Loading</div>;
	}

	const product = subProduct.product;
	const plan = subProduct.plan;
	return (
		<div>
			<div>
				<div style={{ width: "400px", height: "250px", position: "relative" }}>
					<Image
						src={ProductFuncs.getImage(product.id)}
						alt="Business Logo"
						fill
						sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
						style={{ objectFit: "cover" }}
					/>
				</div>

				<h5>Business: {business.name}</h5>
				<h5>Category: {product.catTitle}</h5>
				<h3>Name: {product.name}</h3>
				<br />
				{/* product details */}
				<h4>Description</h4>
				<p>{product.description}</p>
				<br />
				<h4>Usages</h4>
				<div>
					{plan.usages &&
						plan.usages.map((usage) => (
							<div>
								<p>{usage.title}</p>
								<p>x{usage.amount}</p>
							</div>
						))}
				</div>

				{/* TESTING */}
			</div>
		</div>
	);
}

export default Subscription;
