import React, { useState } from 'react';

function CodeDisplay(props) {
  const { role, code } = props;

  return (
    <div>
    
            <textarea type="text"  
              value={code}
              defaultValue={code}
              disabled={role==="mentor"}
              />
      
    </div>
  );
}

export default CodeDisplay;
