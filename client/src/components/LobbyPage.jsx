import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import ListCodes from './ListCodes';
import Code from "./Code";
import "../css/lobbyPage.css";


function LobbyPage() {
    const [items,setItems]=useState([]);
   
    useEffect(() => {
      fetch("https://sleepy-fortress-74328-1833960bec9d.herokuapp.com/", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "User");
          setItems(data);
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

