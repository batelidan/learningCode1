import React, { useState } from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import CodeDisplay from './CodeDisplay';
import "../css/code.css";

function Code(props){
    const [permissions,setPermissions]=useState("");
    const [editedCode, setEditedCode] = useState(props.lesson.incorrectCode);
    const [socket,setSocekt]=useState('');

    
     useEffect(() => {
        const socket = io('http://localhost:3001');
      
        socket.on('connect', () => {
          // Emit an event to notify the server that a user has entered the page
          socket.emit('userEnteredRoom',props.lesson.title );
          socket.on('newClientCode',(newClientCode)=>{
            setEditedCode(newClientCode);
            console.log("new code from client" ,newClientCode)
        })
          socket.on('permissions', (data) => {
            setPermissions(data.role)
          
            console.log(data.role)
          });
        });
        setSocekt(socket);

          return (()=>{
          socket.disconnect();
        });
  
      }, []);

     
    return(<div>
        <h1>Hello I am a {permissions}</h1>
        <h2 className="lesson-title"> Today we will learn about: {props.lesson.title}</h2> 

     <CodeDisplay
        role={permissions}
        code={editedCode}
        goodtCode={props.lesson.correctCode}
        className={`CodeDisplay-code ${permissions === 'mentor' ? 'mentor' : 'student'}`}
        socket={socket}
      />      
    </div>);
    
}
export default Code;

///concation with socket 