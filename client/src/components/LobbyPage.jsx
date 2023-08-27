import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import ListCodes from './ListCodes';
import Code from "./Code";
import "../css/lobbyPage.css";
import axios from 'axios';

function LobbyPage() {
    const [items,setItems]=useState([]);
   
    useEffect(() => {
      axios.get(`https://sleepy-fortress-74328-1833960bec9d.herokuapp.com/lessons`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Handle the error, e.g., display an error message to the user
        });
    }, []);
  
  return (
    <Router>
      <div className="lobby-page">
        <Routes>
          <Route path="/" element={<ListCodes items={items} />} />
          {items.map(item => (
            <Route key={item.title} path={`/code/${item.title}`} element={<Code lesson={item} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default LobbyPage;

