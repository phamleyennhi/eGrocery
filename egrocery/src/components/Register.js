import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

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
    if (password !== password2)
      return this.setState({error: "Password does not match!"});
    this.props.context.register(username, password)
      .then((registered) => {
        console.log(registered);
        if (!registered) {
          this.setState({ error: "Email already in use!" });
        }
        else{
          this.setState({error: "Registering in progress!"});
          this.setState({registered: true})
        }
      })
  };

  render() {
    return !this.state.registered ? (
      <>
        <Container>
            <Row>
            <Col lg="6" className="mx-auto border rounded p-4">
            <Row className="mx-auto pt-3 pb-3">
              <Col lg="10" className="mx-auto">
                <h1 className="mb-4">Register</h1>

        <form onSubmit={this.register}>
          <div className="form-group"> 
                <input
                  className="form-control"
                  type="email"
                  name="username"
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
              <div className="form-row" style={{alignItems: "center"}}>
              <div className="col-2">
              <img 
              className="rounded img-fluid"
              src="https://cdn.countryflags.com/thumbs/united-arab-emirates/flag-square-500.png" 
              style={{maxHeight: "38px",height: "auto", width: "auto"}} />
              </div>
              <div className="col-10">
              <input
                  className="form-control"
                  type="phone"
                  name="phone"
                  placeholder="Mobile phone (+971)"

                />
              </div>
              </div>
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password2"
                  placeholder="Repeat password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="text-danger">{this.state.error}</div>
              )}
              <div className="form-group">
                <Button
                  className="bg-main form-control"
                >
                  REGISTER
                </Button>
              </div>

        </form>
        </Col>
            </Row>
              

            </Col>
          </Row>

        </Container>
      </>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withContext(Register);
