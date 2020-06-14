import React, {useState} from "react";
import '../css/Tendency.scss'

function Tendency(props){
  const [tendency] = useState(props.tendency);
  
  function checking(e){
      const check = document.getElementById(e.target.value)
      if(e.target.checked){
        check.style.boxShadow = "0 0 0 15px rgb(255, 216, 131)"
      }
      else{
        check.style.boxShadow = "unset"
      }
  }

  return (
      <div>
          <p id="tendencyText">마음에 드는 장소를 최소 10개 선택해 주세요.</p>
          <ul className='tendency'>
          {tendency.map(element => (
            <li key={element.contentId}>
                <label id={element.contentId} style={{backgroundImage: `url(${element.firstImage})`, 
                backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <input type="checkbox" value={element.contentId} 
                    onChange={props.method} onClick={checking}/>
                    
                </label>
                <p>
                    {element.title}
                </p>
            </li>
          ))}
          </ul>
      </div>
  );
}

export default Tendency;