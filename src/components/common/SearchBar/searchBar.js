import React from "react";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Input } from "@mui/material";

const SearchBar = ({ placeholder, onChange, searchBarWidth }) => {
	return (
		<div> 
			<BlurOnIcon />
			<Input placeholder={placeholder} onChange={onChange} style={{width: searchBarWidth}} />
		</div>
	)
}

export default SearchBar