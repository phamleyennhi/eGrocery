import React, { Component } from "react";
// import{ useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import axios from 'axios';
import Search from "./Search";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import {  Navbar, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap';

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
      const search_pattern = this.state.search_pattern;
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
                    addAlert={this.props.context.addAlert}
                    user={this.props.context.user}
                  />) : (console.log("product at index " + index + " " + product.name.toLowerCase() + " not contained " + search_pattern.toLowerCase()))
                  }
                  </>
                ))
              ]
              : 
              (
                <div className="column text-center">
                  <p className="loading "> Loading products ...</p>
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
      <NavItem>
        <NavLink className="font-weight-bold text-secondary-custom" href="/products/imperfect">
          Imperfect Produce<span class="badge badge-danger loading">SALE!</span>
        </NavLink>
      </NavItem>
    </Nav>
    </Container>
    </Navbar>


    {this.state.category ? "" :
      
      <div class="main-hero jumbotron jumbotron-fluid mt-n5 mb-5 justify-content-center align-items-center d-flex">
        <div class="container">
        <Row >
          <Col xs="12" sm="12" md="8" lg="8" className="mx-auto text-center">
            <img className="img-fluid" src="eGROCERY.png" alt=""/>
            <h2 class="text-light" style={{fontWeight:"300"}}>Shop freshly. Shop freely. Shop responsibly.</h2>
            <Button
                    className="btn-main-two mx-auto pl-5 pr-5 mt-5"
                  >
                    <a href="#about-us">OUR STORY</a>
                  </Button>
          </Col>
        </Row>
        </div>
      </div>
        
    }

    <Container>
      <Row className="text-capitalize mb-5 text-center">
          <h1 className="text-center mx-auto m-0 p-0 text-uppercase">{this.state.category ? this.state.category : "Featured products" }{this.state.category == "imperfect" && " produce" }</h1>
      </Row>
      {this.state.category == "imperfect" &&
      <Row className="mb-3 text-center">
        <Col xs="12" sm="12" md="8" lg="8" className="mx-auto text-center">
        <small className="text-secondary text-center">eGrocery offers a wide array of produce that, while seems a bit <i>imperfect</i>, provides you with more affordable choices. We help produce that doesn't look perfect or about to expire to your basket, cutting off food waste. Imperfect Produce™ is the <b>perfect</b> solution for <b>you</b> and <b>the environment</b>. Together, let's make the world greener and kinder 💚</small>
        </Col>
      </Row>
      }
      <Row>
        <Search placeholder={this.state.category ? "Search "+ this.state.category : "Search featured products" } onChange={(e) => {this.setState({search_pattern: e.target.value})}}/>

      </Row>
      <Row className="product-list-wrapper justify-content-center mb-5">
      { product_list }
      </Row>
            </Container>

      {this.state.category ? "" :
      <>
      <div class="secondary-hero jumbotron jumbotron-fluid mt-n5 mb-5 justify-content-center align-items-center d-flex">
        <div class="container">
        <Row >
          <Col xs="12" sm="12" md="8" lg="8" className="mx-auto text-center">
            <h1 className="text-light">Special Offers</h1>
            <h3 class="text-light" style={{fontWeight:"300"}}>Shop Imperfect Produce™ for a fraction of the price to reduce food waste and save our planet!</h3>
            <Button
                    className="btn-main-two mx-auto pl-5 pr-5 mt-5"
                  >
                    <a href="#about-us">SHOP IMPERFECT PRODUCE™</a>
                  </Button>
          </Col>
        </Row>
        </div>
      </div>

      <Container>
      <Row className="mt-5 ml-4" id="about-us">
        <h1>
          About eGrocery
        </h1>
      </Row>
      </Container>
      </>
      }


    </>
  )};
};

export default withContext(ProductList);
