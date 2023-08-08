import React from 'react';
import Navbar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import Grid from "@mui/material/Grid"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Grid container>
      <Navbar />
      <Outlet />
    </Grid>
  )
}

export default App;
