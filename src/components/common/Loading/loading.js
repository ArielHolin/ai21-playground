import React from "react";
import { Skeleton } from "@mui/material";

const Loading = ({ children }) => {
	return (
		<>
			<Skeleton>{children}</Skeleton>
		</>
	)
}

export default Loading