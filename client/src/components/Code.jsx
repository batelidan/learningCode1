import React, { useState } from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import CodeDisplay from './CodeDisplay';
import "../css/code.css";

function Code(props){
    const [permissions,setPermissions]=useState("");
    const [editedCode, setEditedCode] = useState(props.lesson.incorrectCode);

     useEffect(() => {
        const socket = io('http://localhost:3001');
      
        socket.on('connect', () => {
          // Emit an event to notify the server that a user has entered the page
          socket.emit('userEnteredRoom',props.lesson.title );
      
          socket.on('permissions', (data) => {
            setPermissions(data.role);
            console.log(data.role)
          });

          console.log("the conction ");
        });

          return (()=>{
          socket.disconnect();
        });
  
      }, []);

     
    return(<div><h1 className="lesson-title">{props.lesson.title}</h1>
     
     <CodeDisplay
        role={permissions}
        code={props.lesson.incorrectCode}
        className={`CodeDisplay-code ${permissions === 'admin' ? 'admin' : 'user'}`}
      />      
    </div>);
    
}
export default Code;

///concation with socket 