import axios from 'axios';
import React, { Component } from 'react';
import './login.css'
import {Link} from 'react-router-dom';
import { Input } from '../ui/input';

interface LoginState {
  email: string;
  password: string;
  err: string;
  msg: string;
  user_type: string;
  isLogin: boolean;
}

class Login extends Component<{}, LoginState> {

  constructor(props: any) {
    super(props);
    this.state = {
      email:'',
      password:'',
      err:'',
      msg:'',
      user_type:'',
      isLogin:false
    };

  }


  componentDidMount() {
   
  }


  handleSubmit = (event: any) =>{
    event.preventDefault();

    axios.post(
      // 'http://185.210.144.40/api/login', 
      `${import.meta.env.VITE_APP_BASE_URL}/login`, 
      { 'email':this.state.email , 'password':this.state.password }
      )
      .then((response) => {
        this.setState({
          msg: response.data['message'],
          user_type:response.data['user_type'],
          isLogin:response.data['isLogin'],
          err:''
        })

        localStorage.setItem("token",response.data['token']);
        alert(response.data['message']);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        this.setState({err: error.response.data['message']});
      });
  };

  render(){

  return (
    <div className="main"> 
    {/* {localStorage.getItem('isLogin') &&    <>{window.location.reload()}</>} */}
      <div className="left">
        <img src='images/logo.png' alt="GetFly logo" />
        <h1>
          <strong> Vasantdada Patil Pratishthan's <br />College of Engineering & Visual Arts </strong>
        </h1>
      </div>

      <div className="login-line"></div>
      <div className="right">
        <div className="right-heading">

        </div>

        <div className="right-login">
          <h1>Login</h1>
          <p>
            Welcome to Academate. Please <br />
            login to your account.
          </p>
        </div>

        <form onSubmit={this.handleSubmit}>

        <div className="form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Id
          </label>
          <Input 
            type='email'
            id='email'
            onChange={(event) => this.setState({email:event.target.value})}
          />
          {/* <input
            type="text"
            className="form-control"
            id="email"
            // value={this.state.email}
            onChange={(event) => this.setState({email:event.target.value})}
          /> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Input 
            type='password'
            id='password'
            onChange={(event) => this.setState({password:event.target.value})}
          />
          {/* <input
            type="password"
            className="form-control"
            id="password"
            // value={this.state.password}
            onChange={(event) => this.setState({password:event.target.value})}
          /> */}
        </div>
        {/* Error Message */}
        <div className="error-message">
          {this.state.msg && <p>{this.state.msg}</p>}
          {this.state.err && <p>{this.state.err}</p>}
        </div>
        

        <button type="submit" className="btn">
          <strong>Login</strong>
          
        </button>
        </div>
      </form>

        <div className="foot">
          <p><strong>www.getflytechnologies.com</strong></p>
        </div>
      </div>
    </div>
  );
}}

export default Login;
