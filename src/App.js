import React, {Component} from 'react';
import "./css/Custom.css";
import { HashRouter as Router, Route, Redirect} from "react-router-dom";
import { Login, SignUp, Home, MySchedule, SharePage, Schedule, Profile, DetailView,Recommend} from "./routes";
import { MenuBar,Footer } from './components'

class App extends Component{
  // let re = /(signup|tendency)/;
  // let isAuth = re.test(this.props.location.pathname);

  state = {
    logtinState : sessionStorage.getItem('token'),
  };

  render(){
    if(this.state.logtinState){
      return (
        <Router>
          <Redirect path="*" to="/yourSchedule" />
          {/* <Redirect path="*" to="/yourSchedule/" /> */}
          <Route path="/yourSchedule" component={MenuBar}></Route>
          <Route exact path="/yourSchedule" component={Home}></Route>
          <Route exact path="/yourSchedule/myschedule" component={MySchedule}></Route>
          <Route exact path="/yourSchedule/sharepage" component={SharePage}></Route>
          <Route path="/yourSchedule/schedule" component={Schedule}></Route>
          <Route exact path="/yourSchedule/profile" component={Profile}></Route>
          <Route exact path="/yourSchedule/detailView/:id" component={DetailView}></Route>
          <Route exact path="/yourSchedule/recommend/:area" component={Recommend}></Route>
          <Route path="/yourSchedule" component={Footer}></Route>

        </Router>
      )
    }
    else{
      return (
        <Router>
          <Redirect path="*" to="/login" />
          {/* <Redirect path="*" to="/signup" /> */}
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
        </Router>
      )
    }
  }
}

export default App;
