import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Code from "./Code";

function ListCodes(props) {
    return (
      <div>
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
      </div>
    );
  }

export default ListCodes;
