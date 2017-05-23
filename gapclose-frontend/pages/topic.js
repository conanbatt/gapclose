import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import Page from '../components/page.js';
import { authorized } from '../utils/auth';
import React from 'react';
import 'isomorphic-fetch';

export default class Topic extends React.Component {

  static async getInitialProps ({ req, query }) {

    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(`${baseUrl}/api/topics/${query.id}`)
    const json = await res.json()
    return Object.assign({}, {user: await authorized(req)}, json)
  }

  constructor(props){
    super(props)
    this.state = {}
  }

  handleUpdates(callback){
    fetch(`/api/topics/${this.props.topic._id}`)
    .then(res => res.json())
    .then(resp =>{
      this.setState({topic: resp.topic})
      if(typeof callback == "function"){
        callback(resp)

      }
    })
  }

  render(){
    let { topic, user } = this.props;
    let updatedTopic = this.state.topic

    return(<Layout user={user}>
      <div className="topic container">
        <Page>
          <div className="">
            <h1 className="page-header text-center">{topic.title}</h1>
            <Conversation user={user} topic={updatedTopic || topic} comments={this.state.comments} handleUpdates={(args) => this.handleUpdates(args)}/>
          </div>
        </Page>
      </div>
    </Layout>)
  }
}