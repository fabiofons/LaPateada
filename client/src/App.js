import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/formRegister';
import MainMap from './components/MainMap'; 
import Login from './components/formLogin';
import formMatch from './components/formMatch';
import Profile from './components/Profile';
// import { Provider } from 'react-redux'
import store from './store'

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Route exact path="/" component={MainMap} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/newmatch" component={formMatch} />
        <Route path="/profile" component={Profile} />
      </Router>
    );
  }
}

if(localStorage.getItem('token')){
  console.log('localsrtotadb', localStorage.getItem('token'))
  store.dispatch({
    type: 'TOGGLE_LOGIN',
    islogged:true
  });
}

export default App;
