import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = e => this.setState({
        [e.target.name]: e.target.value,
        error: ""
    });

    login = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        if (!username || !password) {
            return this.setState({ error: "Fill all fields!" });
        }

        this.props.context.login(username, password)
            .then((loggedIn) => {
                console.log(loggedIn);
                if (!loggedIn) {
                    this.setState({ error: "Invalid Credentials" });
                } else {
                    this.setState({ error: "Valid Credentails...Keep waiting!" });
                }
            })
    };

    render() {
        return !this.props.context.user ? ( <
            >
            <Container>
            <Row>
            <Col xs="12" sm="8" md="8" lg="6" className="mx-auto shadow-custom rounded p-4">
            <Row className="mx-auto pt-3 pb-3">
              <Col className="mx-auto col-10">
                <h1 className="mb-4">Login</h1>
              <form onSubmit={this.login}>
                <div className="form-group">

                      <input
                        className="form-control rounded pl-2 pr-2 pt-1 pb-1 "
                        type="email"
                        name="username"
                        onChange={this.handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="form-group">
                    
                      
                      <input
                        className="form-control rounded pl-2 pr-2 pt-1 pb-1"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Enter your password"
                      />
                    </div>
                    {this.state.error && (
                      <div className="text-danger">{this.state.error}</div>
                    )}
                    
                        <div className="form-group">
                        <Link to="/register"><small><i>Don't have an account? Sign up!</i></small></Link>
                        </div>
                        <div className="form-group">
                      <Button
                        className="btn-main mx-auto d-block w-100"
                      >
                        LOGIN
                      </Button>
                    </div>

        </form>
              </Col>
            </Row>
              

            </Col>
          </Row>

        </Container>



            <
            />
        ) : (
            <Redirect to="/products" />
        );
    }
}

export default withContext(Login);