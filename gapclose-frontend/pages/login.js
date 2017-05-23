import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import Page from '../components/page.js';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router'
import 'isomorphic-fetch';

import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';

export default class extends React.Component {

  static async getInitialProps ({ req }) {

    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

    const auth = await fetch(`${baseUrl}/api/auth/user`)
    const authRes = { loggedIn: auth.status !== 401 }
    return Object.assign({}, authRes)
  }

  render(){
    return <Layout loggedIn={this.props.loggedIn}>
      <div className="login container">
        <style jsx>{`
          .jumbotron.bg-primary {
              background: #337ab7 !important;
              color: white;
          }
        `}
        </style>
        <div className="jumbotron bg-primary">
          <h1>Debate and Discuss</h1>
          <p>GapClose is a platform to have fruitful online discussion, where the pros and cons of every argument can be organized, answered and re-utilized in different topics.</p>
        </div>
        <Page>
          <h3> Log In </h3>
          <LoginForm onLogin={(e)=> Router.push("/")}/>
        </Page>
        <Page>
          <h3> Create Account </h3>
          <RegisterForm onSuccess={(e)=> Router.push("/")}/>
        </Page>
      </div>
    </Layout>
  }
}