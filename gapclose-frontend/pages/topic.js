import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import React from 'react';

export default class extends React.Component {

  static async getInitialProps ({ req, query }) {
    const res = await fetch(`http://localhost:3003/api/topics/${query.id}`)
    const json = await res.json()
    return json
  }

  render(){
    console.log("req", this.props)

    let { topic } = this.props;

    let title = "Hola"//this.props.topic.title;
    return(<Layout>
      <div className="topic">
        <div className="container">
          <h1 className="page-header text-center">{topic.title}</h1>
          <Conversation topic={topic} />
        </div>
      </div>
    </Layout>)
  }
}