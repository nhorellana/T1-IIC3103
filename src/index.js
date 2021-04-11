import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route } from "react-router-dom";
import Bad_Seasons from './Components/Breakingbad/seasons';
import Saul_Seasons from './Components/Bettercallsaul/seasons';
import Episode from './Components/Breakingbad/episodes';
import Rol from './Components/Characters/rol'

ReactDOM.render(
  <ThemeProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <BrowserRouter >
      <div className = "App" >
        <Route path = "/" exact component = { App} /> 
        <Route path = "/bad_seasons" exact component = { Bad_Seasons} />
        <Route path = "/saul_seasons" exact component = { Saul_Seasons} />
        <Route path = "/episode/:id" exact component = { Episode} /> 
        <Route path = "/character/:name" exact component = { Rol} /> 
      </div> 
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();