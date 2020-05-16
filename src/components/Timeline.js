import React from "react";
import Place from "./Place"
import HowTo from "./HowTo"
import '../css/Timeline.scss'



// 타임 라인
function TimeLine() {
   return (
      <div className="container">
         <ul className="timeline">
            <Place />

         </ul>
      </div>

   );
}

export default TimeLine;