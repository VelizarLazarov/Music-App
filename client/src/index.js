import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyCNJcVsgWzILa50AWcKEM0EYsaPP-Pdgtg",
  authDomain: "musicapp-dc722.firebaseapp.com",
  databaseURL: "https://musicapp-dc722-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "musicapp-dc722",
  storageBucket: "gs://musicapp-dc722.appspot.com",
  messagingSenderId: "345953057583",
  appId: "1:345953057583:web:d1aa09028cd2c2ebaebfda"
  }

  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
