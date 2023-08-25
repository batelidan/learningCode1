import React, { useState } from 'react';
import "../css/codeDisplay.css";

function CodeDisplay(props) {
  const { role, code } = props;

  return (
    <div className={`CodeDisplay-container ${role}`}>
    <textarea
      className="CodeDisplay-code"
      value={code}
      defaultValue={code}
      disabled={role === "mentor"}
    />
      
    </div>
  );
}

export default CodeDisplay;
