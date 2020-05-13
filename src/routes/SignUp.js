import React, { useState } from "react";
import { Title } from '../components';

function SignUp(){
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPWConfirm] = useState("");
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
    return (
      <div id="signupPage">
        <Title/>
        <input className="InputInfo" placeholder="e-mail" />
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
        <input className="InputInfo" placeholder="이름" />
        <br />
        <input className="InputInfo" placeholder="생년월일" />
        <br />
        <input className="InputInfo" placeholder="주소" />
        <button className="searchBtn" id="signup_searchBtn">
          검색하기
        </button>
        <br />
        <input className="InputInfo" placeholder="세부주소" />
        <br />
        <button className="middleBtn" id="signup_middleBtn">
          회원가입하기
        </button>
      </div>
    );
}

export default SignUp;