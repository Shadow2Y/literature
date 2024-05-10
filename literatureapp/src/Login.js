import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import config from './config.json';
import css from './Login.module.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      captchaText: '',
      captchaId: '',
      captchaImg:'',
      userName: ''
  };}
  fetchCaptcha = () => {
    axios.get(`${config.apiURL}/captchaid`)
      .then( res => {
        console.log(res.data)
        this.setState({captchaId: res.data.captchaId,captchaImg:res.data.captchaImg})
      })
  }
  joinRoom = () => {
    let data = {captchaId: this.state.captchaId, captchaText: this.state.captchaText, roomCode: this.state.roomCode, userName: this.state.userName}
    axios.post(`${config.apiURL}/joinroom`,data)
      .then(res => {
        console.log(res);
        const login = res.data.status==="JOINED";
        this.setState({message:res.data.status,login:login});
      })
  }
  enterValues = (key,val) => {
    this.setState({[key]: val});
  }
  render() {
    if(this.state.login)
      return(<Navigate to="/room" />)
    const createOrJoin = this.state.roomCode === '' ? "CREATE ROOM" : "JOIN ROOM"; 
    return (
    <div id={css.main}>
      <div id={css.firstOption}>
        {this.state.captchaId === '' ? this.fetchCaptcha() : <></>}
        <div id={css.captcha}>
          <svg id={css.captchaImg} dangerouslySetInnerHTML={{ __html: this.state.captchaImg }}/>
          <input id={css.captchaInput} placeholder='CAPTHCA' onInput={(e)=>this.enterValues('captchaText',e.target.value)}/>
        </div>
        <div id={css.optionButtons}>
        <input  className={css.buttons} placeholder='USERNAME' onInput={(e)=>this.enterValues('userName',e.target.value)}/>
        <input  className={css.buttons} placeholder='ROOM CODE' onInput={(e)=>this.enterValues('roomCode',e.target.value)}/>
        <button className={css.buttons} onClick={this.joinRoom} disabled={this.state.userName==''} >{createOrJoin}</button>
        </div>
      </div>
      <div>{this.state.message}</div>
    </div>
  );
  }
}

export default Login;
