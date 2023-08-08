import React from "react";
import { Card, CardContent } from "@mui/material";

const BasicCard = ({ header, content }) => {
	return (
		<Card>
			{header}
			<CardContent>
				{content}
			</CardContent>
		</Card>
	)
}

export default BasicCard