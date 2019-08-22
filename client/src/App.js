import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/formRegister';
import MainMap from './components/MainMap'; 
import Login from './components/FormLogin';
import FormMatch from './components/FormMatch';
import Profile from './components/Profile';
// import moment from 'moment';
import store from './store';
import {toggleLogin, loadMatches, loadUser } from './actionCreators';

store.dispatch(loadUser());
store.dispatch(loadMatches());

class App extends React.Component {
  

  render() {
    return (
      <Router>
        <Route exact path="/" component={MainMap} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/newmatch" component={FormMatch} />
        <Route path="/profile" component={Profile} />
      </Router>
    );
  }
}

if(localStorage.getItem('token')){
  store.dispatch(toggleLogin());
}



export default App;
