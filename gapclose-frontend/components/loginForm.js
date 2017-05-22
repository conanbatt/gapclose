import Link from 'next/link'
import Head from 'next/head'
import React from 'react';
import { Modal } from 'react-bootstrap';
import 'isomorphic-fetch';

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  onChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event){

    event.preventDefault();

    fetch('/api/auth/login', {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response)=>{
      return response.json()
    }).then((json)=>{
      console.log("validation response", json)
      if(json.message == "ok"){
        if(typeof this.props.onLogin === 'function'){
          this.props.onLogin(json)
        }
      }
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
          <label> Password </label>
          <input type="password" name="password" className="form-control" onChange={(e)=>{ this.onChange(e)}}/>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Log in"/>
        </div>
        <ul className="list-group">
          { this.state.response && this.state.response.message !== "ok" ?
            <li className="list-group-item list-group-item-danger"> { this.state.response.message }</li> : null
          }
        </ul>
      </form>
    );
  }
}

