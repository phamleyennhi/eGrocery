import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';
const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
      <Row className="mb-3 mx-auto align-items-center shadow-custom rounded">
        <Col md="3" className="border-right p-0">
          <img className="img-fluid mx-auto p-2" src={product.url} alt="" />
        </Col>
        <Col md="9">
          <Row>
            <Col md="8">
            <h4 className="text-capitalize font-weight-bold mb-0">
              {product.name}
            </h4>
            <h6 className="text-secondary">
              {product.shortDesc}
            </h6>
          </Col>
          <Col md="4" className="text-right">
            <div>
              <h3 className="d-inline product-price">{product.price}</h3><h6 className="d-inline"> AED</h6>
            </div>
            <div className="btn-group btn-group-toggle mt-2 mb-2" data-toggle="buttons">
              <button type="button" className="btn btn-main btn-sm" onClick={() => props.editCartQuantity(cartItem, cartKey, -1)}>-</button>
              <button type="button" className="btn btn-outline-main btn-sm" disabled>{amount}</button>
              <button type="button" className="btn btn-main btn-sm" onClick={() => props.editCartQuantity(cartItem, cartKey, 1)}>+</button>
            </div>
            
          </Col>
          </Row>
          

        </Col>
        <Col>
        </Col>

      </Row>
  );
};

export default CartItem;
