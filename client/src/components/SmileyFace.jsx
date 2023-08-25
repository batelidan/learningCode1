import React from "react";
import smile from "../img/SmileyFace.jpg";
import "../css/smileyFace.css";

function SmileyFace(){
return(
<div className="congratulations">
  <img src={smile} alt="Smile" className="smile-image" />
  <p className="message">Well done, you did a great job!</p>
</div>
);
}
export default SmileyFace;