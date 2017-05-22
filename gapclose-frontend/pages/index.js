import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import Page from '../components/page.js';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router'
import 'isomorphic-fetch';

export default class extends React.Component {

  static async getInitialProps ({ req }) {
    const res = await fetch("/api/topics")
    const json = await res.json()
    return json
  }

  render(){
    return <Layout>
      <div className="index container">
        <style jsx>{`
          .list-group-item-hover {
              transition: background 0.2s ease-in-out;
              cursor: pointer;
          }
          .list-group-item-hover:hover, .list-group-item-hover:active {
              background: #f5f5f5;
          }
          .jumbotron.bg-primary {
              background: #337ab7 !important;
              color: white;
          }
        `}
        </style>
        <div className="jumbotron bg-primary">
          <h1>Debate, Discuss, Disentangle</h1>
          <p>GapClose is a platform to have fruitful online discussion, where the pros and cons of every argument can be organized, answered and re-utilized in different topics.</p>
        </div>
        <Page>

          <CreateTopic/>
          <h2> Current Topics </h2>
          <ul className="list-group">
          { this.props.topics.map((topic,i)=>{
            return(<Link key={i} prefetch href={`/topic?id=${topic._id}`}><li className="list-group-item list-group-item-hover"><h4><a>{ topic.title }</a></h4></li></Link>)
          })}
          </ul>
        </Page>
      </div>
    </Layout>
  }
}

class CreateTopic extends React.Component {

  constructor(props){
    super(props);
    this.state = { title: ''}
  }

  onChange(event){
    this.setState({title: event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    fetch('/api/topics', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response)=>{
      return response.json()
    }).then((json)=>{
      let url = `/topic?id=${json.topic._id}`
      Router.push(url)
    })
  }

  render(){
    return(<div>
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div className="form-group">
          <textarea type="text" className="form-control"
            placeholder="What's on your mind?"
            value={this.state.title}
            onChange={ (e) => this.onChange(e) }
            required={true}
            minlength="10"
            maxlength="150"
          />
        </div>
        <input className="btn-primary btn" type="submit" value="Send"/>
      </form>
    </div>)
  }
}