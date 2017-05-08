import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import React from 'react';
import Link from 'next/link';
import 'isomorphic-fetch';

export default class extends React.Component {

  static async getInitialProps ({ req }) {
    const res = await fetch("http://localhost:3003/api/topics")
    const json = await res.json()
    return json
  }

  render(){
    return <Layout>
      <div className="index">
        <div className="container">
          <h1> Topics </h1>
          <ul>
          { this.props.topics.map((topic,i)=>{
            return(<li key={i}><Link prefetch href={`/topic?id=${topic._id}`}><a>{ topic.title }</a></Link></li>)
          })}
          </ul>
        </div>
      </div>
    </Layout>
  }
}