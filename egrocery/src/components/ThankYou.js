import React from "react";
import withContext from "../withContext";
import { Link } from "react-router-dom";

class ThankYou extends React.Component {

  render() {
    return (
    	<>
        <div className="hero is-primary ">
          <div className="hero-body container">
          <h4 className="title">Thank you! We've received your message!</h4>
          Thank you for submitting the form! Our team at eGrocery will be in contact with you in 24 hours!
          <br></br>
          <br></br>
          <Link to="/products"><i>Continue shopping</i></Link>
          </div>
        </div>
	     </>
    );
  };
};

export default withContext(ThankYou);
