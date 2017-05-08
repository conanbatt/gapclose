import React, { PropTypes, PureComponent } from 'react';

export default class SimpleForm extends PureComponent {

  static defaultProps = {
    method: "POST",
    onFail: ()=>{},
    beforeSubmit: ()=>{},
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    beforeSubmit: PropTypes.func.isRequired,
  };

  onSubmit(){
    return (e)=>{
      e.preventDefault();
      if(this.props.beforeSubmit() == false){
        return false;
      }
      let formData = $(this.refs.form).serializeJSON();
      if(this.props.appendData){
        formData = Object.assign(formData, this.props.appendData())
      }
      $.post(this.props.action, formData)
        .then(this.props.onSuccess)
        .catch((resp)=>{
          console.error("Error submitting form", resp)
          this.props.onFail(resp)
        })
    }
  }

  render() {
    const { children, onFail, onSuccess } = this.props;

    return (
      <form ref='form' onSubmit={ this.onSubmit() } {...(this.props)} >
        { this.props.children }
      </form>
    );
  }
}
