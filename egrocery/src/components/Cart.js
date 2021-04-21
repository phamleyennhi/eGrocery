import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';
const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  var total_price = 0;
  for (var item of cartKeys){
    var amount = cart[item].amount;
    var price = cart[item]["product"]["price"];
    total_price += amount*price;
  }
  //Check for free shipping
  if (total_price > 100){
    console.log("yay");
  }
  return (
    <>
      <Container>
        <Row className="mb-5">
          <h1>Your Shopping Cart</h1>
        </Row>

        {cartKeys.length ? (

        <Row>
          
          <Col lg={{ size: 4, order: 2}} >
          <div className="p-3 mb-5 align-items-left shadow-custom rounded">
            <h4 className="text-capitalize font-weight-bold mb-0">
              Total: {total_price} AED
            </h4>
              
            <Link to="/products" className="mt-2 ">
             <i>Add more products for free shipping on order over AED 100!</i>
            </Link>

            <Row className="mt-4">
                <Button
                  className="btn-main btn-block mb-4"
                  onClick={() => {
                      if(!props.context.user){
                        props.history.push("/login");
                      }else{
                        props.history.push("/checkout");
                      }
                    }}
                >
                  CHECKOUT
                </Button>

                <Button
                  onClick={props.context.clearCart}
                  className="btn-sm btn-outline-danger ml-auto"
                >
                  Clear cart
                </Button>

            </Row>
            </div>
          </Col>

          <Col lg={{ size: 8, order: 1}}>

          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                editCartQuantity={props.context.editCartQuantity}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
  
          </div>
        
          </Col>
          
       
        </Row>
         ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}

      </Container>
      
    </>
  );
};

export default withContext(Cart);
