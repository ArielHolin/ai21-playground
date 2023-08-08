import React, { useState } from 'react'
import BasicCard from '../../components/common/BasicCard/basicCard';
import SearchBar from '../../components/common/SearchBar/searchBar';
import CommonButton from '../../components/common/CommonButton/commonButton';
import { Box, Typography } from '@mui/material/';
import GridWrapper from '../../components/common/GridWrapper/gridWrapper';
import { cardHeaderStyles } from '../styles';
import DataTable from '../../components/common/DataTable/dataTable';
import BasicSnackbar from '../../components/common/BasicSnackbar/basicSnackbar';
import { Row, Col } from 'react-bootstrap'

const columns = [
	{ field: 'text', headerName: 'Paraphrase', width: 500 },
];

const userTableStyles = {
	height: '650px',
}

const Phrases = () => {
	const [fetched, setFetched] = useState(false)
	const [inputPhrase, setInputPhrase] = useState('')
	const [phrases, setPhrases] = useState([])
	const [open, setOpen] = useState(false)
	const [style, setStyle] = useState('general')
	const [click, setClick] = useState(false)
	
	const getHeader = () => {
		
		const handleChange = (value) => {
			setInputPhrase(value)
		};

		const fetchParaphrase = async (value) => {
			setFetched(true)
			setClick(true)
			setStyle(value)

			const options = {
				method: 'POST',
				headers: {
				  accept: 'application/json',
				  'content-type': 'application/json',
				  Authorization: 'Bearer BpAmcyaP3jH2VX7XiOAVFQBouYC9UAqD'
				},
				body: JSON.stringify({text: inputPhrase, style: style})
			  };

			debugger

			const phraseResponse = await fetch('https://api.ai21.com/studio/v1/paraphrase', options)
			const phraseJson = await phraseResponse.json()
			setPhrases(phraseJson.suggestions)
			setClick(false)
		};

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				<SearchBar 
					placeholder="Insert phrase"
					onChange={(event) => handleChange(event.target.value)}
					searchBarWidth='600px'
				/>
				<Box>
					<Row>
						{['general', 'casual', 'formal'].map(el => {
							return (
								<Col>
									<CommonButton 
										variant="contained"
										onClick={() => fetchParaphrase(el)}
										size="large"
										sx={cardHeaderStyles.fetchButton}
									>
										{el}
									</CommonButton>
								</Col>
							)
						})}
					</Row>
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
				<DataTable 
					rows={phrases}
					columns={columns}
					loading={click || phrases.length === 0}
					sx={userTableStyles}
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
					No phrase has been inserted yet
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

export default Phrases;