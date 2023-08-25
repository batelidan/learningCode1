import React, { useState } from 'react';
import "../css/codeDisplay.css";
import SmileyFace from './SmileyFace';

function CodeDisplay(props) {
  const { role, code , goodtCode} = props;
  const [newCode,setNewCode]=useState(code);
  const [isEqualCode,setisEqualCode]=useState("");

  const onCodeChange = (updatedCode) => {
    // Perform any additional actions here if needed
    setNewCode(updatedCode);
  };

  const handleClick = () => {
    setisEqualCode(goodtCode === newCode);
    console.log("The value of flag is", newCode);
    console.log("The value of flag is", goodtCode);
    console.log("The value of flag is", isEqualCode);
  };

  return (
    <div className={`CodeDisplay-container ${role}`}>
    <textarea
      className="CodeDisplay-code"
      value={newCode}
      disabled={role === "mentor"}
      onChange={(e)=>{
        e.preventDefault();
        onCodeChange(e.target.value);
      }}
    />
      {role==="student" ? <button className="button-container" onClick={handleClick}>send</button>: null}
      {isEqualCode===false && <p>Try Again!</p>}
      {isEqualCode && <SmileyFace/>}
     
    </div>
  );
}

export default CodeDisplay;
