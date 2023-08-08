import React, { useState } from 'react'
import BasicCard from '../../components/common/BasicCard/basicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../components/common/SearchBar/searchBar';
import CommonButton from '../../components/common/CommonButton/commonButton';
import { Box, IconButton, Typography } from '@mui/material/';
import GridWrapper from '../../components/common/GridWrapper/gridWrapper';
import { cardHeaderStyles } from '../styles';
import DataTable from '../../components/common/DataTable/dataTable';
import BasicSnackbar from '../../components/common/BasicSnackbar/basicSnackbar'

const columns = [
	{ field: 'id', headerName: 'Tweet ID', width: 150 },
	{ field: 'author_username', headerName: 'Author Username', width: 150 },
	{ field: 'created_at_human', headerName: 'Created At', width: 150 },
	{ field: 'text', headerName: 'Text', width: 150 },
	{ field: 'like_count', headerName: 'Likes Count', width: 150 },
	{ field: 'retweet_count', headerName: 'Retweet Count', width: 150 },
];

const errorColumn = [
	{ field: 'errorMsg', headerName: 'Error Message', width: 850 },
]

const userTableStyles = {
	height: '650px',
}

const Tweets = () => {
	const [fetched, setFetched] = useState(false)
	const [inputTweetId, setInputTweetId] = useState('')
	const [tweets, setTweets] = useState([])
	const [open, setOpen] = useState(false)
	const [success, setSuccess] = useState(true)
	
	const getHeader = () => {
		
		const handleChange = (value) => {
			setInputTweetId(value);
		};

		const fetchTweet = async () => {
			setFetched(true)

			const processResponse = await fetch(`https://utility.loola.tv/process/tweet?tweet_id=${inputTweetId}`)
			const processJson = await processResponse.json()

			if(processJson.success) {
				const tweetsResponse = await fetch(`https://utility.loola.tv/tweet?tweet_id=${inputTweetId}`)
				const tweetsJson = await tweetsResponse.json()
				setTweets(tweetsJson)
				setSuccess(true)

				let interval = setInterval(async () => {
					const statusResponse = await fetch(`https://utility.loola.tv/process/tweet/status?tweet_id=${inputTweetId}`)
					const statusJson = await statusResponse.json()
					
					if(!statusJson.success || statusJson.status === 'completed') {
						clearInterval(interval)
						interval = null
					}
				}, 5000)
			}
			else {
				setSuccess(false)
				setTweets(processJson)
			}
		};

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				<SearchBar 
						placeholder="Search by tweet id"
						onChange={(event) => handleChange(event.target.value)}
						searchBarWidth='720px'
				/>
				<Box>
					<CommonButton 
						variant="contained"
						onClick={fetchTweet}
						size="large"
						sx={cardHeaderStyles.fetchButton}
					>
						Fetch Tweets
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
			{!success ? tweets["id"] = 1: null}
			<DataTable 
				rows={tweets}
				columns={success ? columns : errorColumn}
				loading={!tweets[1] && Array.isArray(tweets)}
				sx={userTableStyles}
				success={success}
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
						No Tweets for this project yet
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

export default Tweets;