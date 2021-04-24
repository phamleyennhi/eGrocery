import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Row, Col, Button } from 'reactstrap';

class Feedback extends Component {
  constructor(props) {
      super(props);
      this.state = {
        feedback_db: []
      }
      // this.setState({ token: this.props.context });
      const { user } = props.context;
      console.log(user);
  }

  async componentDidMount() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmFmYjJmYjc5NWEyYzZiZjU1OWQ4YiIsImlhdCI6MTYxOTMwMzEzNiwiZXhwIjoxNjE5Mzg5NTM2fQ.LpVw0dWMI915r3_DBX7VpKHKpJ_OpHsIENHuWQAA6CA";
    const res = await axios.get('https://se-egrocery.herokuapp.com/api/admin/feedback',
                                        {headers: {"x-access-token": token}});
    this.setState({feedback_db: res.data});
    console.log(this.state.feedback_db);
  }

  render(){
    return (
      <>
      <Container>
      {this.state.feedback_db.map((feedback, index) => (
        <div key={index}>
            <li> {feedback.name} </li>
            <a> {feedback.email} </a>
            <a> {feedback.message} </a>
        </div>
      ))}
      </Container>
      </>
    );
}};

export default withContext(Feedback);






