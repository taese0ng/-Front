import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Title } from "../components";
import axios from 'axios';
import { connect } from "react-redux";
import { setUserName } from "../store/store";

function Login({setUserName}) {
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
  
    axios.post("http://49.50.175.145:3389/api/auth/login", {
      // username: "dlfdyd96",
      // password: "password123"
      username: name,
      password: password
    }).then((res) => {
      // console.log(res)
      if(res.data.success){
        let token = res.data.data
        localStorage.setItem(
          "token" , token
        );

        axios.get("http://49.50.175.145:3389/api/auth/me",{
          headers: { 
            'x-access-token':token
          }
        }).then((res) =>{
            console.log(res.data)
            if (res.data.success){
              localStorage.setItem(
                "name" , res.data.data.name
              )
              setUserName();
            }
          }
        )

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


function mapStateToProps(state) {
  return { userName: state.userName };
}

function mapDispatchToProps(dispatch) {
  return { setUserName: () => dispatch(setUserName()),};
}
export default connect(mapStateToProps, mapDispatchToProps) (Login);