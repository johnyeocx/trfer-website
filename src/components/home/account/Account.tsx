import React from "react";
import Details from "./Details";
import Margin from "@/components/general/margin";
import EditPage from "./EditPage";

function Account() {
	return (
		<div>
			<Details />
			<Margin height={25} />
			<EditPage />
		</div>
	);
}

export default Account;
