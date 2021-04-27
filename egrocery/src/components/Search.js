import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Link } from "react-router-dom";

import { Row, Col, Button } from 'reactstrap';


const Search = ({onChange, placeholder}) => {
  return (
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
  );
};

export default Search;
