import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Title } from "../components";
import axios from 'axios';
import {ServerIP} from '../key'

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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

  function InputEmail(e){
    setEmail(e.target.value);
  }

  function Clicks(e){
    e.preventDefault();
    const data ={
      email:email,
      password: password,
    }
    axios.post(`${ServerIP}/login`, data)
    .then((res) =>{
      console.log(res)
      let token = res.data.token;
      let user = res.data.user;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      history.push("/yourSchedule");
    })
    .catch(err => {
      console.log(err);
      alert("아이디 / 비밀번호를 확인해주세요.");
    })
  }

  return (
    <div id="loginPage">
      <Title />
      <form onSubmit={Clicks}>
        <input className="InputInfo" placeholder="e-mail" onChange={InputEmail} value={email}/>
        <br />
        <input
          onChange={only_eng}
          value={password}
          className="InputInfo"
          placeholder="password"
          type="password"
        />
        <br />
        {/* <Link to="/yourSchedule"> */}
        <button className="middleBtn" id='loginBtn'>여행 시작</button>
        {/* </Link> */}
        <Link to="/signup">
          <button className="middleBtn" id='loginBtn'>여행 준비</button>
        </Link>
      </form>
    </div>
  );
}


export default Login;