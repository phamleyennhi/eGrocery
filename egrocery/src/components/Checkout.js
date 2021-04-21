import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }


    render() {
        return <Container>
        	asd
        </Container>
    }
}
export default withContext(Checkout);

