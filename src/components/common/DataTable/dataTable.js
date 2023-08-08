import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({ rows, columns, loading, sx }) => {
	const [pageSize, setPageSize] = useState(5)
	let inputRows = rows
	debugger
	for(let i = 0; i < inputRows.length; i++) {
		inputRows[i].id = i
	}
	debugger
	return (
		<DataGrid
			rows={inputRows}
			columns={columns}
			loading={loading}
			sx={sx}
			checkboxSelection
			pagination
			pageSize={pageSize}
			onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
			rowsPerPageOption={[5, 10]}
		/>
	)
}

export default DataTable