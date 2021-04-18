import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2:"",
      registered: false
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  register = (e) => {
    console.log(this.state);
    e.preventDefault();

    const { username, password, password2 } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.register(username, password)
      .then((registered) => {
        console.log(registered);
        if (!registered) {
          this.setState({ error: "Email already in use!" });
        }
        else{
          if (password != password2)
            return this.setState({error: "Password does not match!"})
          this.setState({error: "Registering in progress!"});
          this.setState({registered: true})
        }
      })
  };

  render() {
    return !this.state.registered ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
                <div className="container is-max-desktop">

        <form onSubmit={this.register}>
          <div className="columns is-mobile is-centered">
            <div className="column is-half">
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="username"
                  placeholder="enter your email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Confirm Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password2"
                  placeholder="re-enter your password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withContext(Register);
