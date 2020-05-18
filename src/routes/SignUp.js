import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Title } from '../components';
import axios from 'axios';


function SignUp(){
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPWConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    function only_eng_confirm(e) {
      var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

      if (!check_kor.test(e.target.value)) {
        setPWConfirm(e.target.value);
      } else {
        alert("영문, 숫자, 특수문자만 입력 가능합니다.");
      }
    }
    function only_eng(e) {
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

    function InputName(e){
      setName(e.target.value);
    }

    function InputBirthday(e){
      setBirthday(e.target.value);
    }

    function InputAddress(e){
      setAddress(e.target.value);
    }

    function InputDetailAddress(e){
      setDetailAddress(e.target.value);
      console.log(birthday, address, detailAddress)

    }
  
    function IsSignUp(){
      axios.post("http://49.50.175.145:3389/api/users", {
        username: email,
        password: password,
        passwordConfirmation: passwordConfirm,
        name: name
      }).then((res) => {
        //console.log(res)
        if(res.data.success){
          alert("회원가입이 완료 되었습니다.");
          history.push("/login");
        }
        else{
          alert("입력된 데이터를 다시 한 번 확인해보세요.");
        }
      });
    }

    return (
      <div id="signupPage">
        <Title/>
        <input className="InputInfo" placeholder="e-mail" onChange={InputEmail} />
        <button className="searchBtn" id="signup_searchBtn">
          인증하기
        </button>
        <br />
        <input
          onChange={only_eng}
          value={password}
          className="InputInfo"
          placeholder="password"
          type="password"
        />
        <br />
        <input
          onChange={only_eng_confirm}
          value={passwordConfirm}
          className="InputInfo"
          placeholder="password 확인"
          type="password"
        />
        <br />
        <input className="InputInfo" placeholder="이름" onChange={InputName}/>
        <br />
        <input className="InputInfo" placeholder="생년월일" onChange={InputBirthday}/>
        <br />
        <input className="InputInfo" placeholder="주소" onChange={InputAddress}/>
        <button className="searchBtn" id="signup_searchBtn">
          검색하기
        </button>
        <br />
        <input className="InputInfo" placeholder="세부주소" onChange={InputDetailAddress}/>
        <br />
        <button className="middleBtn" id="signup_middleBtn" onClick={IsSignUp}>
          회원가입하기
        </button>
      </div>
    );
}

export default SignUp;