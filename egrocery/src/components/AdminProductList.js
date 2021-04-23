import React from "react";
import AdminProductItem from "./AdminProductItem";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

const AdminProductList = props => {
  const { products, user} = props.context;
  return (
    <>
    <Container>
      <Row className="mb-5">
          <h1>Our Products</h1>
      </Row>
      <Row className="product-list-wrapper justify-content-center">
          {products && products.length ? (
            products.map((product, index) => (
              <AdminProductItem
                product={product}
                key={index}
                deleteProduct={props.context.deleteProduct}
                editProduct={props.context.editProduct}
              /> 
            ))
          ) 
          : 
          (
            <div className="column">
              <span className="title has-text-grey">
                Display products here...
              </span>
            </div>
          )}

      </Row>
      
      </Container>
    </>
  );
};

export default withContext(AdminProductList);
