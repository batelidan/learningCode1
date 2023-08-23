import React from 'react';


function Code(props){
    return(<div><h1>{props.lesson.title}</h1>
    <p>{props.lesson.incorrectCode}</p>
    </div>);
    
}
export default Code;

///concation with socket 