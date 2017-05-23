import Head from 'next/head';
import Conversation from '../components/conversation.js';
import Layout from '../components/layout.js';
import Page from '../components/page.js';
import { authorized } from '../utils/auth';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import 'isomorphic-fetch';

export default class extends React.Component {

  static async getInitialProps ({ req }) {

    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(`${baseUrl}/api/topics`)
    const json = await res.json()

    const auth = await authorized(req)
    return Object.assign({}, {loggedIn: auth}, json)
  }

  render(){
    return <Layout loggedIn={this.props.loggedIn}>
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
          <h1>Debate and Discuss</h1>
          <p>GapClose is a platform to have fruitful online discussion, where the pros and cons of every argument can be organized, answered and re-utilized in different topics.</p>
        </div>
        <Page>
          <CreateTopic/>
        </Page>
        <Page>
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
    if(this.state.title.length > 10 && this.state.title.length < 150){
      this.setState({ invalidTitleLength: false})
    }
    this.setState({title: event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    if(this.state.title.length < 10 || this.state.title.length > 150){
      return this.setState({ invalidTitleLength: true})
    }
    fetch('/api/topics', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: this.state.title})
    }).then((response)=>{
      return response.json()
    }).then((json)=>{
      let url = `/topic?id=${json.topic._id}`
      Router.push(url)
    })
  }

  render(){
    return(<div>
      <p>Create a new Topic </p>
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div className="form-group">
          <textarea type="text" className="form-control"
            placeholder="What's on your mind?"
            value={this.state.title}
            onChange={ (e) => this.onChange(e) }
            required={true}
            title="10 to 150 characters"
            minLength="10"
            maxLength="150"
          />
        </div>
        <div className="form-group">
          <input className="btn-primary btn" type="submit" value="Send"/>
        </div>
      </form>
       { this.state.invalidTitleLength ?
          <ul className="list-group">
            <li className="list-group-item list-group-item-danger">Title must be between 10 and 150 characters</li>
          </ul> : null
        }
    </div>)
  }
}