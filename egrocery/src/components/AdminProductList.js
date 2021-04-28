import React, { Component } from "react";
// import{ useParams } from "react-router-dom";
import AdminProductItem from "./AdminProductItem";
import withContext from "../withContext";
import axios from 'axios';
import Search from "./Search";


import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import {  Navbar, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap';

class AdminProductList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          products: {},
          category: "",
          search_pattern: ""
      };

      const { match: { params } } = this.props;
      console.log(this.props);
      this.state.category = params.category;
  }
  async componentDidMount() {
    if(this.state.category == null){
      // this.state.products = this.props.context;
      const res = await axios.get('https://se-egrocery.herokuapp.com/api/products');
      this.setState({products: res.data});
    }
    else{
      const res = await axios.get('https://se-egrocery.herokuapp.com/api/products/'+this.state.category);
      this.setState({products: res.data});
    }
    console.log(this.state.products);

  }

render() {
  const search_pattern = this.state.search_pattern;
  const product_db = this.state.products;
  console.log(product_db);
  const product_list = product_db && product_db.length ?[
                product_db.map((product, index) => (
                  <>
                  {product.name.toLowerCase().indexOf(search_pattern.toLowerCase()) !== -1 ?
                  (<AdminProductItem
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
              className="mt-n5 mb-5 bg-white small text-center"
              role="navigation"
              aria-label="navigation"

            >
            <Container>
      <Nav navbar className={'flex-row  is-active'}>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/bakery">
            Bread & Bakery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/breakfast">
            Breakfast & Cereal
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/soups">
            Canned Goods & Soups
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/dairy">
            Dairy, Eggs & Cheese
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/grains">
            Grains, Pasta & Sides
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/fruit">
            Fruit & Vegetables
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/meat">
            Meat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-secondary" href="/admin-products/snacks">
            Cookies, Snacks & Candy
          </NavLink>
        </NavItem>
      </Nav>
      </Container>
      </Navbar>
      {this.state.category == "imperfect" &&
      <>
        <div class="secondary-hero jumbotron jumbotron-fluid mt-n5 mb-5 justify-content-center align-items-center d-flex">
        <div class="container">
        <Row >
          <Col xs="12" sm="12" md="8" lg="8" className="mx-auto text-center">
            <h1 className="text-light">IMPERFECT PRODUCE™</h1>
            <p className="text-light-2 text-center d-block mb-5">eGrocery offers a wide array of produce that, while seems a bit <i>imperfect</i>, provides you with more affordable choices. We help produce that doesn't look perfect or about to expire to your basket, cutting off food waste. Imperfect Produce™ is the <b>perfect</b> solution for <b>you</b> and <b>the environment</b>. Together, let's make the world greener and kinder 💚</p>
            <Row className="mt-5">
            <Col className="mx-auto text-center">
              <Search placeholder={this.state.category ? "Search "+ this.state.category : "Search featured products" } onChange={(e) => {this.setState({search_pattern: e.target.value})}}/>
            </Col>
            </Row>
          </Col>
        </Row>
        </div>
      </div>
      </>
      }
      {this.state.category != "imperfect" &&
      <>
      <Container>
        <Row className="text-capitalize text-center justify-content-between align-items-center mb-5">
        <Col md="6" className="mx-auto mb-md-0 mb-2">
          <h1 className="text-center text-md-left mx-auto text-uppercase">{this.state.category ? this.state.category : "Featured products" }</h1>
        </Col>
          <Search placeholder={this.state.category ? "Search "+ this.state.category : "Search featured products" } onChange={(e) => {this.setState({search_pattern: e.target.value})}}/>

        </Row>
        <Row>
        </Row>
      </Container>
      </>
      }
      <Container>
        <Row className="product-list-wrapper justify-content-center mb-5">
        { product_list }
        </Row>
      </Container>
      </>
    )};
};
export default withContext(AdminProductList);
