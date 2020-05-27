import React, {Component} from 'react';
import "./css/Custom.css";
import { HashRouter as Router, Route, Redirect} from "react-router-dom";
import { Login, SignUp, Tendency, Home, MyPages, SharePage, Schedule} from "./routes";
import { MenuBar } from './components'

class App extends Component{
  // let re = /(signup|tendency)/;
  // let isAuth = re.test(this.props.location.pathname);

  state = {
    logtinState : localStorage.getItem('token'),
  };
  render(){
    if(this.state.logtinState){
      return (
        <Router>
          {/* <Redirect path="*" to="/yourSchedule" /> */}
          <Redirect path="*" to="/yourSchedule/schedule/5ecd35e6ff3ae2034cec9cf5" />
          <Route exact path="/tendency" component={Tendency}></Route>
          <Route path="/yourSchedule" component={MenuBar}></Route>
          <Route exact path="/yourSchedule" component={Home}></Route>
          <Route exact path="/yourSchedule/mypages" component={MyPages}></Route>
          <Route exact path="/yourSchedule/sharepage" component={SharePage}></Route>
          <Route path="/yourSchedule/schedule" component={Schedule}></Route>
        </Router>
      )
    }
    else{
      return (
        <Router>
          <Redirect path="*" to="/login" />
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
        </Router>
      )
    }
  }
}

export default App;
