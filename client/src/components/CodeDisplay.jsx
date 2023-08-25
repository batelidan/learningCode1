import React, { useEffect, useState } from 'react';
import "../css/codeDisplay.css";
import SmileyFace from './SmileyFace';

function CodeDisplay({ role, code , goodtCode,socket}) {
  const [newCode,setNewCode]=useState(code);
  const [isEqualCode,setisEqualCode]=useState("");
  
  const onCodeChange = (updatedCode) => {
    // Perform any additional actions here if needed
    setNewCode(updatedCode);
    if(socket !== null){
      socket.emit('userEditCode',updatedCode)
    }

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
      value={role === "mentor"?code:newCode}
      disabled={role === "mentor"}
      onChange={(e)=>{
        e.preventDefault();
        onCodeChange(e.target.value);
      }}
      style={{
        minHeight:'250px',
        width:'400px'
      }}
    />
      {role==="student" ? <button className="button-container" onClick={handleClick}>send</button>: null}
      {isEqualCode===false && <p>Try Again!</p>}
      {isEqualCode && <SmileyFace/>}
     
    </div>
  );
}

export default CodeDisplay;
