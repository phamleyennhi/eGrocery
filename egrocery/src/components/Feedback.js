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

  // async componentDidMount() {
  //   // const token = null;
  //   // const res = await axios.get('https://se-egrocery.herokuapp.com/api/admin/feedback',
  //   //                                     {headers: {"x-access-token": token}});
  //   // this.setState({feedback_db: res.data});
  // }

  render(){
    return (
      <>
      <Container>
       Feedback will be printed here!
        </Container>
      </>
    );
}};

export default withContext(Feedback);






