import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Title } from "../components";

function Login() {
  const [password, setPassword] = useState("");
  function only_eng(e) {
    // var check_num = /[0-9]/; // 숫자 
    // var check_eng = /[a-zA-Z]/; // 문자 
    // var check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 
    var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

    if (!check_kor.test(e.target.value)) {
      setPassword(e.target.value);
    } else {
      alert("영문, 숫자, 특수문자만 입력 가능합니다.");
    }
  }

  return (
    <div id="loginPage">
      <Title></Title>
      <input className="InputInfo" placeholder="e-mail" />
      <br />
      <input
        onChange={only_eng}
        value={password}
        className="InputInfo"
        placeholder="password"
        type="password"
      />
      <br />
      <Link to="/yourSchedule">
        <button className="middleBtn">Sign In</button>
      </Link>
      <Link to="/signup">
        <button className="middleBtn">Sign Up</button>
      </Link>
    </div>
  );
}


export default Login;