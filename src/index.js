import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import Navigation from "./Navigation";
import StepContext from "./StepContext";
ReactDOM.render(
  <>
    <Router history={Navigation.history}>
      <StepContext>
        <App />
      </StepContext>
    </Router>
  </>,
  document.getElementById("root")
);
