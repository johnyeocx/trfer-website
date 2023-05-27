import { UserFuncs } from "@/models/user/user";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function ProfileImage({ imageDim = 70, uId }: any) {
	// const user = useSelector((state: RootState) => state.userState.user);

	return (
		<div
			style={{
				height: `${imageDim}px`,
				width: `${imageDim}px`,
				borderRadius: `${imageDim / 2}px`,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Image
				alt=""
				src={UserFuncs.imagePath(uId!)}
				fill
				// className={styles.img}
				style={{ objectFit: "cover" }}
			/>
		</div>
	);
}

export default ProfileImage;
