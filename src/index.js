import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Phrases from './pages/Paraphrases/paraphrases';
import Tweets from './pages/Tweets/tweets';
import Hashtags from './pages/Hashtags/hashtags';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={dashboardTheme}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="paraphrase" element={<Phrases />} />
          <Route path="tweets" element={<Tweets />} />
          <Route path="hashtags" element={<Hashtags />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
