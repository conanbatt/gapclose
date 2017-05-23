import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';

export default class Layout extends React.Component {

  constructor(props){
    super(props);
    this.state = { showLoginModal: false }
  }

  toggleModal(toggle){
    return (e)=> {
      console.log("called")
      this.setState({ showLoginModal: toggle })
    }
  }

  logOut(e){
    e.preventDefault()
    fetch("/api/auth/logout", {credentials: 'same-origin'}).then(resp => resp.json()).then(json =>{
      if(json.loggedOut){
        Router.push("/")
      }
    })
  }

  render(){

    let { loggedIn, children } = this.props;

    return(<div className="layout">
      <Head>
        <style>{`
          html, body {
              height: 100%;
              background: #f5f5f5 !important;
          }
        `}
      </style>
        <title>GapClose - Getting the other side</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"/>
        <link rel="stylesheet" href="static/bootstrap2-toggle.css"/>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.js"></script>
      </Head>
      <style jsx>{`
        .header {
            border-top: 1px solid transparent;
        }
      `}
      </style>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <Link prefetch href="/"><a className="navbar-brand">
            GapClose
          </a></Link>
          <ul className="nav navbar-nav">
            <Link prefetch href="/"><li><a href="#">Topics</a></li></Link>
          </ul>
           <ul className="nav navbar-nav navbar-right">
            <li>
              { loggedIn ?
                <a href="/api/auth/logout" onClick={(e)=> this.logOut(e)}>Log Out </a> :
                <Link prefetch href="/login"><a href="#">Log In </a></Link>
              }
            </li>
          </ul>
        </div>
      </nav>
      { children }
      {/*<footer></footer>*/}
    </div>)
  }

}