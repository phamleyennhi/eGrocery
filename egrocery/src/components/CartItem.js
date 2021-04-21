import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';
const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
      <Row className="mx-auto align-items-center shadow-custom rounded">
        <Col md="3" className="border-right p-0">
          <img className="img-fluid mx-auto p-5" src={product.url} alt="" />
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
              <h1 className="d-inline product-price">{product.price}&nbsp;</h1><h6 className="d-inline">AED/kg</h6>
            </div>
            <p className="m-0">{`${amount} in cart`}</p>
              <a
                href="#"
                className="text-danger"
                onClick={() => props.removeFromCart(cartKey)}
              >
                <small>Remove item</small>
              </a>
          </Col>
          </Row>
          

        </Col>
        <Col>
        </Col>

      </Row>
  );
};

export default CartItem;
