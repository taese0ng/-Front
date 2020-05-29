import React, {Component} from 'react'
import '../css/Profile.scss'

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
                email : 'taese0ng@naver.com',
                name : '',
                password : '',
                passwordConfirm : '',
            }
        }
    }

    clickEditBtn = () =>{
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
                    <tr>
                        <td>e-mail</td>
                        <td> : </td>
                        <span>{userData.email}</span>
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
                        <> </>
                    }
                </table>
                <div>
                    { !editBtns ?
                        <>
                            <button className="middleBtn" onClick={this.clickEditBtn}>Edit</button>
                            <button className="middleBtn" onClick={this.clickEditPW}>EditPW</button>
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