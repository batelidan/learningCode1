import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Code from "./Code";
import Header from './Header';
import Footer from './Footer';
import "../css/listCodes.css";

function ListCodes(props) {
  return (
    <div className="list-codes">
      <Header />
      <h1>Lesson Codes</h1>
      <dl>
        {props.items.map(item => (
          <dt key={item.title}>
            <Link to={`/code/${item.title}`}>{item.title}</Link>
          </dt>
        ))}
      </dl>
      <Routes>
        {props.items.map(item => (
          <Route key={item.title} path={`/code/${item.title}`} element={<Code lesson={item} />} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default ListCodes;
