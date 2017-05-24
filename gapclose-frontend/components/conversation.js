import React from 'react';
import Link from 'next/link';
import Toggle from 'react-bootstrap-toggle';
import 'isomorphic-fetch';

export default ({topic, handleUpdates, user}) => (
  <div className="conversation">
  	<style jsx>{`
      .page-header {
          margin-top: 20px;
      }
      .new {
        padding: 0 20px;
      }
  	`}
  	</style>
    <div>
      {/*<div className="progress">
        <div className="progress-bar pbar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}>
          60%
        </div>

        <div className="progress-bar pbar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}>
          40%
        </div>
      </div>*/}
      { topic.comments.filter(comm => !comm.parent).map((comment, i) => (
        <Bubble topic={topic} comment={comment} handleUpdates={handleUpdates} key={i} user={user}/>
      ))}
      <div className="new">
        <h3> What do you think? </h3>
        <BubbleMaker topic={topic} handleUpdates={handleUpdates} inFavor={true} user={user}/>
      </div>
    </div>
  </div>
)



class BubbleMaker extends React.Component {

  constructor(props){
    super(props);
    let base = { inFavor: this.props.inFavor }
    if(props.comment){
      base.parentId = props.comment._id
    }
    this.state = base;
  }

  onToggle() {
    this.setState({ inFavor: !this.state.inFavor });
  }

  onChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value})
  }

  componentWillReceiveProps(props, state){
    this.setState({inFavor: props.inFavor})
  }

  onSubmit(e){
    e.preventDefault()
    fetch(`/api/topics/${this.props.topic._id}/comments`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
        'Accept':  'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response)=>{
      return response.json()
    }).then((json)=>{
      console.log("response", json)
      this.props.handleUpdates(json)
    })
  }

  render(){
    return(<div className="bubble_placeholder">

      <style jsx>{`
        .add_bubble:hover {
            cursor: pointer;
        }
        .bootstrap-radio input {
            display: none;
        }
        .content {
            resize: none;
            height: 80px;
        }
      `}</style>

      { this.props.user ? <form onSubmit={(e)=>this.onSubmit(e)}>
        <div className="panel panel-default add_bubble text-center">
          <div className="panel-body">
            <div className="form-group">
              <textarea required={true} name="content" placeholder="I think that..." className="content form-control" onChange={(e)=>{this.onChange(e)}}/>
            </div>
            <div className="text-right">
              <Toggle
                onClick={(e)=> { this.onToggle()}}
                on={<div>In Favor</div>}
                off={<div>Against</div>}
                size="md"
                offstyle="danger"
                active={this.state.inFavor}
              />
            </div>
          </div>
          <div className="panel-footer text-right">
            <input type="submit" className="btn-primary btn" value="Send" />
          </div>
        </div>
      </form> : <div className="panel panel-default"><div className="panel-body">
        <Link prefetch href="/login"><a>Log In or Create an account</a></Link> to make comments
      </div></div>}
    </div>)
  }

}

class Bubble extends React.Component {

  constructor(props){
    super(props);
    this.state = { showBubbleMaker: false };
  }

  handleReply(inFavor){

    if(inFavor != this.state.inFavor){
      this.setState({ inFavor: inFavor, showBubbleMaker: true })
    } else {
      this.setState({ showBubbleMaker: !this.state.showBubbleMaker, inFavor: inFavor})
    }
  }

  deleteComment(comment){
    fetch(`/api/topics/${this.props.topic._id}/comments/${comment._id}`, {
      credentials: 'same-origin',
      method: "DELETE"
    }).then(resp => resp.json()).then(json => this.props.handleUpdates())
  }

  deleteCommentButton(comment){
    console.log("dfq is user", comment.user._id,this.props.user._id, comment.children)
    if(comment.user._id == this.props.user._id && !comment.children.length){
      return(<small className="action delete">
        <a onClick={(e)=> {
          let res = confirm("Are you sure you want to delete this comment?");
          if(res){ this.deleteComment(comment)}
        }}>
          <i className="glyphicon glyphicon-remove" alt="delete"/>
          Delete
        </a>
      </small>)
    }
  }

  render(){

    let { comment, topic, handleUpdates,user } = this.props;

    return(<div className={`bubble`}>
      <style jsx>{`

        .bg-danger-light {
            background: rgba(217, 83, 78, 0.05);
        }

        .bg-success-light {
            background: rgba(92, 184, 92, 0.05);
        }

        .action {
          margin-right: 5px;
          cursor: pointer;
        }
        .glyphicon {
          margin-right: 2px;
        }
        .bubble {
            border-bottom: 1px solid #e1e1e1;
            padding: 20px;
        }

        .bubble:first-child {
        }
      `}</style>
      <div className="row">
        <div className={`col-md-8 col-sm-8 col-lg-8 col-md-offset-2 col-sm-offset-2 col-lg-offset-2`}>
          <div className={`panel ${comment.inFavor ? "panel-success" : "panel-danger"}`}>
            <div className="panel-heading">
              { comment.inFavor ? "InFavor" : "Against"}
            </div>
            <div className="panel-body">
              <div><strong>{ comment.user.username }: </strong></div>
              <span>{ comment.content }</span>
            </div>
            <div className="panel-footer">
              {/*<small className="action upvote"><i className="glyphicon glyphicon-arrow-up" alt="upvote"/>Upvote</small>
              <small className="action downvote"><i className="glyphicon glyphicon-arrow-down" alt="downvote"/>Downvote</small> */}
              <small className="action object"><a onClick={(e)=> this.handleReply(false)}><i className="glyphicon glyphicon-share-alt" alt="object"/>Object</a></small>
              <small className="action support"><a onClick={(e)=> this.handleReply(true)}><i className="glyphicon glyphicon-share-alt" alt="support"/>Support</a></small>
              { this.deleteCommentButton(comment) }
            </div>
          </div>
          { this.state.showBubbleMaker ? <BubbleMaker topic={topic}
            user={user}
            comment={comment} inFavor={this.state.inFavor}
            handleUpdates={()=> {
              let fn = (resp)=> (this.setState({ showBubbleMaker: false }))
              console.log("pre call", fn)
              handleUpdates(fn)
            }
          }/> : null}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-lg-6">
          { comment.children.filter(a => (a.inFavor )).map((subComment, i) => (
            <div key={i} className="panel panel-success">
              <div className="panel-body">
                <div><strong>{ subComment.user.username }: </strong></div>
                <span>{ subComment.content }</span>
              </div>
              <div className="panel-footer">
                { this.deleteCommentButton(subComment)}
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6">
          { comment.children.filter(a => !a.inFavor).map((subComment, i) => (
            <div key={i} className="panel panel-danger">
              <div className="panel-body">
                <div><strong>{ subComment.user.username }: </strong></div>
                <span>{ subComment.content }</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>)
  }
}
