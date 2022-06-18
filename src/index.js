import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/userContext";
import { CartContextProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <UserContextProvider>
        <CartContextProvider>
       <Router>
          <App />
        </Router>
        </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
);


reportWebVitals();
