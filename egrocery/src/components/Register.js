import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      username: "",
      phone: "",
      password: "",
      password2:"",
      registered: false
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  register = (e) => {
    console.log(this.state);
    e.preventDefault();
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    var num = "0123456789";
    var containSpecialChars = 0;
    var containNum = 0;
    console.log("containNum:" + containNum);
    const { name, username, phone, password, password2 } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    if (password.length < 8){
      return this.setState({ error: "Password length must be greater than 8 characters!" });
    }
    else{
      for (var c of password){
        if (specialChars.indexOf(c) !== -1){
          containSpecialChars = 1;
        }
        if (num.indexOf(c) !== -1){
          containNum = 1;
        }
      }
      if (containSpecialChars === 0 && containNum === 0){
        return this.setState({ error: "Password must contain at least 1 special character and 1 number!" });
      }
      else if (containNum === 0){
        return this.setState({error: "Password must contain at least 1 number!"})
      }
      else if (containSpecialChars === 0){
        return this.setState({ error: "Password must contain at least 1 special character!" });
      }

    }
    if (password !== password2)
      return this.setState({error: "Password does not match!"});
    console.log(this.state.name +", " + this.state.username + ", " + this.state.phone + ", " + this.state.password);
    this.props.context.register(name, username, phone, password)
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
            <Col lg="6" className="mx-auto shadow-custom rounded p-4">
            <Row className="mx-auto pt-3 pb-3">
              <Col lg="10" className="mx-auto">
                <h1 className="mb-4">Register</h1>

        <form onSubmit={this.register}>
          <div className="form-group"> 
              <input
                  className="form-control"
                  type="name"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group"> 
                <input
                  className="form-control"
                  type="email"
                  name="username"
                  placeholder="Email"
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
                  onChange={this.handleChange}
                />
              </div>
              </div>
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="New password"
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
                  className="btn-main form-control"
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
