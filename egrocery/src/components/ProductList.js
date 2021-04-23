import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

const ProductList = props => {
  const { products } = props.context;
  return (
    <>
    <Container>
      <Row className="mb-5">
          <h1>Our Products</h1>
      </Row>
      <Row className="product-list-wrapper justify-content-center">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
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

export default withContext(ProductList);
