import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Modal } from 'react-bootstrap';
import 'isomorphic-fetch';
import { logIn } from '../utils/auth';

export default class RegisterForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  onChange(event){
    this.setState({[event.target.name]: event.target.value})
  }


  onSubmit(event){

    event.preventDefault();

    fetch('/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response)=>{
      if(response.status == 200){
        logIn(this.state.username, this.state.password).then(resp =>{
          Router.push("/")
        })
      }
      return response.json()
      this.setState({ success: response.status == 200 })

      fetch("/api/auth/login", {})
    }).then((json)=>{
      this.setState({response: json})
    })
  }

  render(){
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div className="form-group">
          <label> Username </label>
          <input type="text" name="username" className="form-control" onChange={(e)=>{ this.onChange(e)}}/>
        </div>
        <div className="form-group">
          <label> E-mail </label>
          <input type="email" name="email" className="form-control" onChange={(e)=>{ this.onChange(e)}}/>
        </div>
        <div className="form-group">
          <label> Password </label>
          <input type="password" name="password" className="form-control" onChange={(e)=>{ this.onChange(e)}}/>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Create"/>
        </div>
        <ul className="list-group">
          { this.state.response && !this.state.success ?
            <li className="list-group-item list-group-item-danger"> { this.state.response.message }</li> : null
          }
        </ul>
      </form>
    );
  }
}

