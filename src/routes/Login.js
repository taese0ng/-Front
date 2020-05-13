import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Title } from "../components";
import axios from 'axios';

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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

  function InputName(e){
    setName(e.target.value);
  }

  function Clicks(e){
    e.preventDefault();
  
    axios.post("http://192.168.0.26:4000/api/auth/login", {
      // username: "dlfdyd96",
      // password: "password123"
      username: name,
      password: password
    }).then((res) => {
      if(res.data.success){
        localStorage.setItem(
          "token" , res.data.data
        );
        history.push("/yourSchedule");
      }
      else if(!res.data.message){
        let str="";
        for (let err in res.data.errors){
          str += res.data.errors[err].message + '\n';
        }
        alert(str);
      }
      else{
        alert(res.data.message);
      }
      console.log(res)//token -> res.data.data
    });
  }

  return (
    <div id="loginPage">
      <Title />
      <form onSubmit={Clicks}>
        <input className="InputInfo" placeholder="e-mail" onChange={InputName} value={name}/>
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
        <button className="middleBtn">Sign In</button>
        {/* </Link> */}
        <Link to="/signup">
          <button className="middleBtn">Sign Up</button>
        </Link>
      </form>
    </div>
  );
}


export default Login;