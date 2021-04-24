import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import {  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap';

const ProductList = props => {
  const { products } = props.context;
  

  
  return (
    <>

    <Navbar
            className="mb-5 bg-white small text-center"
            role="navigation"
            aria-label="navigation"

          >
          <Container>
    <Nav navbar className={'flex-row  is-active'}>
      <NavItem>
        <NavLink className="text-secondary" href="/products/bakery">
          Bread & Bakery
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/breakfast">
          Breakfast & Cereal
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/soups">
          Canned Goods & Soups
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/dairy">
          Dairy, Eggs & Cheese
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/grains">
          Grains, Pasta & Sides
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/fruit">
          Fruit & Vegetables
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/meat">
          Meat
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="text-secondary" href="/products/snacks">
          Cookies, Snacks & Candy
        </NavLink>
      </NavItem>
    </Nav>
    </Container>
    </Navbar>

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
