import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Landing.module.scss";
import Landing from "@/components/landing/Landing";
import Navbar from "@/components/navbar/Navbar";

export default function Root() {
	return (
		// <div style={success ? { overflow: "hidden" } : {}}>
		<>
			<Navbar />
			<Landing />
		</>
	);
}
