import SimpleForm from '../components/simple_form.js';
import React from 'react';
import Toggle from 'react-bootstrap-toggle';

export default ({topic}) => (
  <div className="conversation">
  	<style jsx>{`
      .page-header {
          margin-top: 20px;
      }
  	`}
  	</style>
    <div>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-6">
        <h3 className="text-success text-center "><u>Yes</u></h3>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6">
          <h3 className="text-danger text-center "><u>No</u></h3>
        </div>
      </div>
      {/*<div className="progress">
        <div className="progress-bar pbar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}>
          60%
        </div>

        <div className="progress-bar pbar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}>
          40%
        </div>
      </div>*/}
      { topic.comments.map((line, i) => (
        <div className="row" key={i}>
          <div className={`${i%2 == 0 ? '' : 'col-md-offset-6 col-lg-offset-6 col-sm-offset-6' } col-md-6 col-lg-6 col-sm-6`}>
            <Bubble message={line}/>
          </div>
        </div>
      ))}
      <div className="new">
        <BubbleMaker/>
      </div>
    </div>
  </div>
)



class BubbleMaker extends React.Component {

  constructor(props){
    super(props);
    this.state = { inFavor: true}
  }

  onToggle() {
    this.setState({ inFavor: !this.state.toggleActive });
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

        .message {
            resize: none;
        }
      `}</style>
      <SimpleForm action="/api/conversation/1/bubble" onSuccess={ (vals)=> { console.log(e)}}>
        <div className="panel panel-default add_bubble text-center">
          <div className="panel-body">
            <div className="form-group">
              <textarea name="message" placeholder="I think that..." className="message form-control"/>
            </div>
            <input type="hidden" value={this.state.inFavor} name="inFavor"/>
            <div className="form-group text-left">
              <Toggle
                onClick={this.onToggle}
                on={<h2>In Favor</h2>}
                off={<h2>Against</h2>}
                size="md"
                offstyle="danger"
                active={this.state.inFavor}
              />
            </div>
          </div>
          <div className="panel-footer text-right">
            <div className="btn-primary btn">
              <span>Send</span>
            </div>
          </div>
        </div>
      </SimpleForm>
    </div>)
  }

}

const Bubble = ({message}) => (
  <div className="bubble">
    <style jsx>{`
      .action {
        margin-right: 5px;
      }
      .glyphicon {
        margin-right: 2px;
      }
    `}</style>
    <div className="panel panel-default">
      <div className="panel-body">
        { message }
      </div>
      <div className="panel-footer">
        <small className="action upvote"><i className="glyphicon glyphicon-arrow-up" alt="upvote"/>Upvote</small>
        <small className="action downvote"><i className="glyphicon glyphicon-arrow-down" alt="downvote"/>Downvote</small>
        <small className="action reply"><i className="glyphicon glyphicon-share-alt" alt="reply"/>Reply</small>
      </div>
    </div>
  </div>
)