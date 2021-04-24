import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

const ProductItem = props => {
  const { product } = props;
  return (
  <Col sm="6" lg="4" xl="3" className="p-4 product-item">
    <Row className="mx-auto text-center align-items-center justify-content-center shadow-custom rounded" style={{"height": "100%"}}>
      <Col md="12" className="border-bottom p-0">
        <img className="img-fluid mx-auto p-2" src={product.url} alt="" />
      </Col>
      <Col md="12" className="mt-3">
        <h4 className="text-capitalize font-weight-bold mb-0">
          {product.name}
        </h4>
        <h6 className="text-secondary">
          {product.shortDesc}
        </h6>
        <div className=" mt-3">
          <h1 className="d-inline product-price">{product.price}</h1><h6 className="d-inline"> AED</h6>
        </div>
        <Button
                className="btn-main mt-4"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
              >
                ADD
              </Button>

        <p className="text-secondary">
          {product.stock > 0 ? (
              <small>{product.stock + " in stock"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
        </p>  
      </Col>
    </Row>
  </Col>
  );
};

export default ProductItem;
