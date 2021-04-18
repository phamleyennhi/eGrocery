import React from "react";
import withContext from "../withContext";

class ThankYou extends React.Component {

  render() {
    return (
    	<>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Thank you! We've received your message!</h4>
          </div>
        </div>
	      <div>
	       Thank you for submitting the form! Our team at eGrocery will be in contact with you in 24 hours!
	      </div>
	     </>
    );
  };
};

export default withContext(ThankYou);
