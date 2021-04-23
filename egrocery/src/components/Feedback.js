import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Row, Col, Button } from 'reactstrap';

const Feedback = props => {
  const { feedback_db} = props.context;
  console.log(feedback_db)
  return (
    <>
    <Container>
      {feedback_db.map((feedback, index) => (
        <div key={index}>
            <li> {feedback.name} </li>
            <a> {feedback.email} </a>
            <a> {feedback.message} </a>
        </div>
      ))}
      </Container>
    </>
  );
};

export default withContext(Feedback);






