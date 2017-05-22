import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import Page from '../components/page.js';
import React from 'react';
import 'isomorphic-fetch';

export default class extends React.Component {

  static async getInitialProps ({ req, query }) {
    const res = await fetch(`/api/topics/${query.id}`)
    const json = await res.json()
    return json
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
      console.log("what is", callback)
      if(typeof callback == "function"){
        callback(resp)

      }
    })
  }

  render(){
    console.log("req", this.props)

    let { topic } = this.props;
    let updatedTopic = this.state.topic

    return(<Layout>
      <div className="topic container">
        <Page>
          <div className="">
            <h1 className="page-header text-center">{topic.title}</h1>
            <Conversation topic={updatedTopic || topic} comments={this.state.comments} handleUpdates={(args) => this.handleUpdates(args)}/>
          </div>
        </Page>
      </div>
    </Layout>)
  }
}