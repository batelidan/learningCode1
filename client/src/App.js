import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import ListCodes from './components/ListCodes';
import Code from './components/Code';
import LobbyPage from './components/LobbyPage';


function App() {
  return (
    <LobbyPage/>
  );
}

export default App;
