import React from 'react';
import "./css/Custom.css";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Login, SignUp, Tendency, Home, MyPages, SharePage ,Timeline} from "./routes";
import { MenuBar } from './components'

function App() {
  // let re = /(signup|tendency)/;
  // let isAuth = re.test(this.props.location.pathname);
  return (
    <Router>
      <Redirect path="*" to="/login" />
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/tendency" component={Tendency}></Route>
      <Route path="/yourSchedule" component={MenuBar}></Route>
      <Route exact path="/yourSchedule" component={Home}></Route>
      <Route exact path="/yourSchedule/mypages" component={MyPages}></Route>
      <Route exact path="/yourSchedule/sharepage" component={SharePage}></Route>
      <Route exact path="/timeline" component={Timeline}></Route>

      {/* <Route path="/:id" component={Detail}></Route> */}
    </Router>
  );
}

export default App;
