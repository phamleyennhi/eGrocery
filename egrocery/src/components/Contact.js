import React, { Component } from 'react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
    // To ensure 'this' when calling 'this.updateField' refers to Form and not Field, we do:
    this.updateField = this.updateField.bind(this);
  }

  updateField(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(event) {
    console.log('A contact form was submitted');
    event.preventDefault();
    this.props.history.push("/thankyou");
  }

  render() {
    return (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Contact</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="container is-max-desktop">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="columns is-mobile is-centered">
            <div className="column is-half">
              <div className="field">
                  {/* Name */}
                  <label className="label">Name: </label>
                  <input
                    className="input"
                    placeholder="enter your name"
                    onChange={(event) => this.updateField('name', event.target.value)}
                  />
                  {/* Email */}
                  <label className="label">Email: </label>
                  <input
                    className="input"
                    placeholder="enter your email"
                    onChange={(event) => this.updateField('email', event.target.value)}
                  />
                  {/* Message */}
                  <label className="label">Message: </label>
                  <textarea rows="12" cols="64" style={{width: '100%'}}
                    placeholder="Your message starts here..."
                    onChange={(event) => this.updateField('message', event.target.value)}
                  />
                </div>
                {/* Submit*/}
                <div className="field is-clearfix">
                <button 
                  className="button is-primary is-outlined is-pulled-right">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </>
    )
  }
}

export default Contact;
