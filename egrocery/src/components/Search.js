import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Link } from "react-router-dom";

import { Row, Col, Button } from 'reactstrap';


const Search = ({onChange, placeholder}) => {
  return (
  	
  	<Col md="6" className=" mx-auto">
	      <input
	      className="p-3 rounded form-control text-md-left text-center shadow-custom"
	        type="text"
	        onChange={onChange}
	        placeholder={placeholder}
	      />
      </Col>

  );
};

export default Search;
