import React from 'react'
import '../css/Footer.scss'

function Footer(){
    return(
        <div id="footer">
            <ul id="footer__nav">
                <li>
                    인재채용
                </li>
                <li>
                    고객센터
                </li>
                <li>
                    이용약관
                </li>
                <li>
                    찾아오는 길
                </li>
                <li>
                    개인정보 보호
                </li>
                <li>
                    About us
                </li>
            </ul>
            <div id="footer__copyright">
                &copy; Copyright {new Date().getFullYear()} MUJUCK 449
            </div>
                
        </div>
    )
}


export default Footer;