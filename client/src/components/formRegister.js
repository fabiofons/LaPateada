import React from 'react';
import { Redirect } from 'react-router-dom';
import store from '../store'
import '../styles/style.css';


class Register extends React.Component {
  state = {
    nickname: '',
    email: '',
    password: ''
  }  

  render() {
    return (
      <div className='frame'>
        <form>
          <div className='title'>
            <h2><i>REGISTRO</i></h2> 
          </div>

          <div className='divider'></div>

          <label>Nickname</label>
          <input name='nickname' placeholder='Nickname..' value={this.state.nickname} onChange={this.handleChange}/>

          <label>Email</label>
          <input name='email' placeholder='Email..' value={this.state.email} onChange={this.handleChange}/>

          <label>Password</label>
          <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>

          <div className='button blue' onClick={() => this.handleSubmit(this.state)}> REGISTRO </div>
          <a className='button red' href='/'> CANCEL </a>
        </form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = user => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Todos los campos deben estar diligenciados, Intentalo nuevamente');
        this.setState({
          nickname: '',
          email: '',
          password: ''
        });
      } else {
        localStorage.setItem("token", data);
        store.dispatch({
          type: 'TOGGLE_LOGIN',
          islogged: true
        });
        alert('Usuario creado');
        this.props.history.push(`/`);
      }
    })
    .catch(error => console.log(error));      
  }

  handleRedirect = () => {
    return < Redirect to='/'/>
  }
}

export default Register;