import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Row, Col, Button } from 'reactstrap';

class Feedback extends Component {
    constructor(props) {
    super(props);
	    this.state = {
	      name: "",
	      email: "",
	      message:""
	    };
	  }
    render(){
    	return(
    		<div>
    		Feedback will be printed here...!
    		</div>
    	)
    }
}

export default withContext(Feedback);






