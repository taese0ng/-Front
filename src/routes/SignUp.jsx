import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Title, Tendency } from '../components';
import {HopeIP} from '../key'
import axios from 'axios'

function SignUp(){
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPWConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [openTendency, setOpenTendency] = useState(false);
    const [choice, setChoice] = useState([]);
    const [tendency, setTendency] = useState([]);

    useEffect(() => {
      axios.get(`${HopeIP}/api/recommend/testset/`)
      .then(res=>{
          // console.log(res.data)
          let list=[]
          // eslint-disable-next-line
          res.data.map((element) => {
              list.push(element);
          })

          setTendency(tendency => list)
          
      })
      .catch(err => console.log(err))
  }, [])


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
  
    function IsSignUp(){
      const data = {
        name: name,
        email: email,
        verifyPassword: passwordConfirm,
        password: password,
        selections: choice
      };
      axios.post("http://49.50.175.145:3389/join", data)
      .then((res) => {
        // console.log(res)
        alert("회원가입이 완료 되었습니다.");
        history.push("/login");
      })
      .catch(err => {
        alert("입력된 데이터를 다시 한 번 확인해보세요.");
        console.log(err);
      })
    }

    function tendencyOpen(){
      setOpenTendency(openTendency => !openTendency)
      setChoice([])
    }

    function checkTendncy(e){
      // console.log(e.target.value);
      if(e.target.checked){
        setChoice([...choice, parseInt(e.target.value)])
      }
      else{
        setChoice(choice.filter(element => element !== e.target.value))
      }
    }

    return (
      <div id="signupPage">
        <Title/>

        {openTendency ? <Tendency method={checkTendncy} tendency={tendency}/> :
          <>
            <input value={email} className="InputInfo" placeholder="e-mail" onChange={InputEmail} />
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
            <input value={name} className="InputInfo" placeholder="이름" onChange={InputName}/>
          </>
        } 
        

        <br />
        <Link to='/login'>
          <button className="middleBtn" id="loginBtn">취소</button>
        </Link>
        <button className="middleBtn" id="loginBtn" onClick={tendencyOpen}>
          {openTendency ? "정보입력" : "성향파악"}
        </button>
        <button className="middleBtn" id={choice.length >= 10 ? "loginBtn" : "disableBtn"} 
        onClick={choice.length >= 10 ? IsSignUp : undefined}>
          여행준비
        </button>
      </div>
    );
}

export default SignUp;