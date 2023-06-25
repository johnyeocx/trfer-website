import { s3Endpoint } from "@/misc/constants";
import Image from "next/image";
import React from "react";

const getProfileImage = (id: number) => {
	return `${s3Endpoint}/creator/profile_image/${id}`;
};

function ProfileImage({ id, dimension, image }: any) {
	return (
		<div
			style={{
				position: "relative",
				width: dimension,
				height: dimension,
				borderRadius: dimension / 2,
				overflow: "hidden",
			}}
		>
			<Image
				sizes="100%"
				src={image}
				alt=""
				fill
				style={{ objectFit: "cover" }}
			/>
		</div>
	);
}

export default ProfileImage;
