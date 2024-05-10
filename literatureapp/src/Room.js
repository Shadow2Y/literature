import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from './config.json';
import css from './Room.module.css';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
  };}
  enterValues = (key,val) => {
    this.setState({[key]: val});
  }
  render() {
    return (
    <div id={css.main}>
      <div id={css.firstOption}>
        <div id={css.captcha}>
          <svg id={css.captchaImg} dangerouslySetInnerHTML={{ __html: this.state.captchaImg }}/>
          <input id={css.captchaInput} placeholder='CAPTHCA' onInput={(e)=>this.enterValues('captchaText',e.target.value)}/>
        </div>
        <div id={css.optionButtons}>
        <button className={css.buttons} onClick={this.joinRoom}>CREATE ROOM</button>
        <button className={css.buttons} onClick={this.joinRoom}>JOIN ROOM</button>
        <input  className={css.buttons} placeholder='ROOM CODE HERE' onInput={(e)=>this.enterValues('roomCode',e.target.value)}/>
        </div>
      </div>
      <div>{this.state.message}</div>
    </div>
  );
  }
}

export default Room;
