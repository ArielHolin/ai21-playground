import React, { useState } from 'react'
import BasicCard from '../../components/common/BasicCard/basicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../components/common/SearchBar/searchBar';
import CommonButton from '../../components/common/CommonButton/commonButton';
import { Box, IconButton, Typography } from '@mui/material/';
import GridWrapper from '../../components/common/GridWrapper/gridWrapper';
import { cardHeaderStyles } from '../styles';
import DataTable from '../../components/common/DataTable/dataTable';
import BasicSnackbar from '../../components/common/BasicSnackbar/basicSnackbar';

const columns = [
	{ field: 'id', headerName: 'Hashtag ID', width: 150 },
	{ field: 'message', headerName: 'Message', width: 350 },
	{ field: 'errorMsg', headerName: 'Error Message', width: 850 },
];

const userTableStyles = {
	height: '650px',
}

const Hashtags = () => {
	const [fetched, setFetched] = useState(false)
	const [inputHashtag, setInputHashtag] = useState('')
	const [hashtags, setHashtags] = useState([])
	const [open, setOpen] = useState(false)
	
	const getHeader = () => {
		
		const handleChange = (value) => {
			setInputHashtag(value)
		};

		const fetchHashtag = async () => {
			setFetched(true)

			const processResponse = await fetch(`https://utility.loola.tv/process/hashtag?hashtag=${inputHashtag}`)
			const processJson = await processResponse.json()
			setHashtags(processJson)

			if(processJson.success) {
				let interval = setInterval(async () => {
					const statusResponse = await fetch(`https://utility.loola.tv/process/user/status?username=${inputHashtag}`)
					const statusJson = await statusResponse.json()
					
					if(!statusJson.success || statusJson.status === 'completed') {
						clearInterval(interval)
						interval = null
					}
				}, 5000)
			}
		};

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				<SearchBar 
						placeholder="Search by hashtag"
						onChange={(event) => handleChange(event.target.value)}
						searchBarWidth='720px'
				/>
				<Box>
					<CommonButton 
						variant="contained"
						onClick={fetchHashtag}
						size="large"
						sx={cardHeaderStyles.fetchButton}
					>
						Fetch Hashtags
					</CommonButton>
					<IconButton>
							<RefreshIcon />
					</IconButton>
				</Box>
			</Box>
		)
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const getContent = () => (
		fetched ? 
		<>
			{hashtags["id"] = 1}
			<DataTable 
				rows={hashtags}
				columns={columns}
				loading={Array.isArray(hashtags)}
				sx={userTableStyles}
				isHashtag={true}
			/>
			<BasicSnackbar
				open={open}
				severity="error"
				message="Data couldn't be fetched"
				onClose={handleClose}
			/>
		</>
		 : <Typography 
					align="center"
					sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
					>
						No hashtags for this project yet
				</Typography>
	);

	return (
		<GridWrapper>
			<BasicCard
				header={getHeader()}
				content={getContent()}
			/>
		</GridWrapper>
	)
}

export default Hashtags;