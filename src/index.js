import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <UserContextProvider>
       <Router>
          <App />
        </Router>
    </UserContextProvider>
  </React.StrictMode>
);


reportWebVitals();
