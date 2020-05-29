import React, {Component} from 'react'
import '../css/Profile.scss'
import axios from 'axios'

class Profile extends Component{
    tempData = {
        email : '',
        name : '',
        password : '',
        passwordConfirm : ''
    }

    constructor(props){
        super(props);
        this.state = {
            edit : false,
            editPW : false,
            editBtns : false,
            userData : {
                email : JSON.parse(sessionStorage.getItem('user')).email,
                name : JSON.parse(sessionStorage.getItem('user')).name,
                passwordNow : '',
                password : '',
                passwordConfirm : '',
            }
        }
    }

    clickEditBtn = () => {
        this.setState({
            edit:true,
            editBtns: true
        })
        this.tempData = this.state.userData;
    }

    changePW = (e) =>{
        this.setState({
            userData : {
                ...this.state.userData,
                password : e.target.value
            }
        })
    }

    changePWC = (e) =>{
        this.setState({
            userData : {
                ...this.state.userData,
                passwordConfirm : e.target.value
            }
        })
    }

    changePWN = (e) => {
        this.setState({
            userData : {
                ...this.state.userData,
                passwordNow : e.target.value
            }
        })
    }
    
    changeName =(e)=>{
        this.setState({
            userData : {
                ...this.state.userData,
                name : e.target.value
            }
        })
    }

    clickOKBtn = ()=>{
        console.log("통신해라");
        if (this.state.editPW){
            const data = {
                oldPassword : this.state.userData.passwordNow, 
                newPassword : this.state.userData.password, 
                newPassword2 : this.state.userData.passwordConfirm
            }
            axios.post("http://49.50.175.145:3389/user/change-password", data, {
                headers : {
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then((res) =>{
                console.log(res)
                alert("비번바뀜 수정 성공.")
            }).catch(err => {
                console.log(err)
                alert("비밀번호 수정 실패.\n입력한 데이터를 다시 확인하세요.")
            })
        }
        else{
            const data = {
                name : this.state.userData.name
            }
            axios.post('http://49.50.175.145:3389/user/edit-profile', data, {
                headers : {
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then((res) =>{
                console.log(res)
                let user = res.data.user;
                sessionStorage.setItem("user", JSON.stringify(user));
                window.location.reload();
            }).catch(err => console.log(err))
        }
        this.setState({
            edit:false,
            editPW : false,
            editBtns : false
        })
    }

    clickCancelBtn = () =>{
        this.setState({
            userData : this.tempData,
            edit : false,
            editPW : false,
            editBtns : false
        })
    }

    clickEditPW = () =>{
        this.tempData = this.state.userData;
        this.setState({
            editPW : true,
            editBtns : true
        })
    }

    render(){
        const {edit, editPW, editBtns, userData} = this.state;
        return(
            <div id="profile">
                <table>
                    <tbody>
                        <tr>
                            <td>e-mail</td>
                            <td> : </td>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td> : </td>
                            { !edit ? <td>{userData.name}</td> : 
                            <td>
                                <input onChange={this.changeName} value={userData.name} placeholder='Name'/>
                            </td>  }
                        </tr>
                        { editPW ?
                            <>
                                <tr>
                                    <td>현재 비밀번호</td>
                                    <td> : </td>
                                    <td>
                                        <input 
                                            onChange={this.changePWN}
                                            type='password' 
                                            value={userData.passwordNow} 
                                            placeholder='Password'/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>비밀번호</td>
                                    <td> : </td>
                                    <td>
                                        <input 
                                            onChange={this.changePW}
                                            type='password' 
                                            value={userData.password} 
                                            placeholder='Password'/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>비밀번호 확인</td>
                                    <td> : </td>
                                    <td>
                                        <input 
                                            onChange={this.changePWC}
                                            type='password' 
                                            value={userData.passwordConfirm} 
                                            placeholder='PasswordConfirm'/>
                                    </td>
                                </tr>
                            </>
                            :
                            <tr>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div>
                    { !editBtns ?
                        <>
                            <button className="middleBtn" onClick={this.clickEditBtn}>
                                <span role="img" aria-label="edit">✏️ </span> Edit
                            </button>
                            <button className="middleBtn" onClick={this.clickEditPW}>
                                <span role="img" aria-label="editPW">🔐</span> EditPW
                            </button>
                        </> :
                        <>
                            <button className="middleBtn" onClick={this.clickOKBtn} >OK</button>
                            <button className="middleBtn" onClick={this.clickCancelBtn}>Cancel</button>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default Profile