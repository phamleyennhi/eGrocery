import React, { Component } from "react";
// import{ useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import {  Navbar, Nav, NavItem, NavLink, Container, Row } from 'reactstrap';

class ProductList extends Component {


  constructor(props) {
        super(props);
        this.state = {
            products: null,
            category: "",
            search_pattern: ""
        };

        const { match: { params } } = this.props;
        this.state.category = params.category;
    }
  async componentDidMount(){
        if(this.state.category == null){
          const res = await axios.get('https://se-egrocery.herokuapp.com/api/products');
          this.setState({products: res.data});
        }
        else{
          const res = await axios.get('https://se-egrocery.herokuapp.com/api/products/'+this.state.category);
          this.setState({products: res.data});
          console.log(this.state.products)
        }
  }
  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.phrase !== this.props.phrase) {
        console.log("something has changed!");
    }
  }

  render() {
      const search_pattern = this.props.context.search_pattern;
      // search_pattern === "" ? (console.log("no search pattern")) : (console.log(search_pattern))
      const product_db = this.state.products;
      const product_list = product_db && product_db.length ?[
                product_db.map((product, index) => (
                  <>
                  {product.name.toLowerCase().indexOf(search_pattern.toLowerCase()) !== -1 ?
                  (<ProductItem
                    product={product}
                    key={index}
                    addToCart={this.props.context.addToCart}
                  />) : (console.log("product at index " + index + " " + product.name.toLowerCase() + " not contained " + search_pattern.toLowerCase()))
                  }
                  </>
                ))
              ]
              : 
              (
                <div className="column">
                  <span> Loading products ...</span>
                </div>
              )
  return (
    <>

    <Navbar
            className="border-bottom mt-n5 mb-5 bg-white small text-center"
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
      <Row className="text-capitalize ml-4 mb-5">
          <h1>{this.state.category ? this.state.category : "Featured products" }</h1>
      </Row>
      <Row className="product-list-wrapper justify-content-center">
      { product_list }
      </Row>
      
      </Container>
    </>
  )};
};

export default withContext(ProductList);
