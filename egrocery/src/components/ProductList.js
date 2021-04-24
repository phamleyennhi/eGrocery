import React, { Component } from "react";
import{ useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import {  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap';

class ProductList extends Component {


  constructor(props) {
        super(props);
        this.state = {
            products: {},
            category: ""
        };

        console.log(this.props.context)
        const { match: { params } } = this.props;

        this.state.category = params.category;
    }

  async componentDidMount() {
     if(this.state.category == null){
            this.state.products = this.props.context;
        }else{
            const res = await axios.get('https://se-egrocery.herokuapp.com/api/products/'+this.state.category);
            this.state.products = res.data
            console.log(this.state.products)
        }
  }


  render() {

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
      <Row className="text-capitalize mb-5">
          <h1>{this.state.category}</h1>
      </Row>
      <Row className="product-list-wrapper justify-content-center">
          {this.state.products && this.state.products.length ? (
            this.state.products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={this.props.context.addToCart}
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
  )};
};

export default withContext(ProductList);
