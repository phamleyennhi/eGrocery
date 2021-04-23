import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

const AdminProductItem = props => {
  const { product} = props;
  return (
  <Col md="3" className="mt-4 mb-4 ml-2 mr-2 product-item">
    <Row className="mx-auto text-center align-items-center justify-content-center shadow-custom rounded">
      <Col md="12" className="border-bottom p-0">
        <img className="img-fluid mx-auto p-5" src={product.url} alt="" />
      </Col>
      <Col md="12" className="mt-3">
        <h4 className="text-capitalize font-weight-bold mb-0">
          {product.name}
        </h4>
        <h6 className="text-secondary">
          {product.shortDesc}
        </h6>
        <div className=" mt-3">
          <h1 className="d-inline product-price">{product.price}&nbsp;</h1><h6 className="d-inline">AED/kg</h6>
        </div>
        <Button
          className="btn-main mt-4"
          onClick={() =>
            props.deleteProduct({
              id: product.name,
              product
            })
          }
        >
          REMOVE
        </Button>
        <div>
        <Button
          className="btn-main mt-4"
          onClick={() =>
            props.editProduct({
              id: product.name,
              product
            })
          }
        >
          EDIT
        </Button>
        </div>
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

export default AdminProductItem;