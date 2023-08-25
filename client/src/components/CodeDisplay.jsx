import React, { useEffect, useState } from 'react';
import "../css/codeDisplay.css";
import SmileyFace from './SmileyFace';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


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
      <SyntaxHighlighter
        className="CodeDisplay-code"
        language="javascript"
        style={docco}
      >
        {role === "mentor" ? code : newCode}
      </SyntaxHighlighter>
      {role === "student" && (
        <div>
          <textarea
            className="CodeDisplay-editable"
            value={newCode}
            onChange={(e) => onCodeChange(e.target.value)}
            disabled={role === "mentor"}
          />
          </div>)}
    
      {role==="student" ? <button className="button-container" onClick={handleClick}>send</button>: null}
      {isEqualCode===false && <p>Try Again!</p>}
      {isEqualCode && <SmileyFace/>}
     
    </div>
  );
}

export default CodeDisplay;
