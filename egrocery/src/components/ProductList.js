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
            className="border-bottom mt-n5 mb-5 bg-white small text-center overflow-x"
            role="navigation"
            aria-label="navigation"

          >
          <Container>
    <Nav navbar className={'flex-row  is-active overflow-x'}>
    <NavItem>
        <NavLink className="font-weight-bold text-secondary-custom" href="/products/imperfect">
          Imperfect Produce<span class="badge badge-danger loading">SALE!</span>
        </NavLink>
      </NavItem>
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

      {this.state.category ? "" :
      <>
      <div class="secondary-hero jumbotron jumbotron-fluid mt-n5 mb-5 justify-content-center align-items-center d-flex">
        <div class="container">
        <Row >
          <Col xs="12" sm="12" md="8" lg="8" className="mx-auto text-center">
            <h1 className="text-light">SPECIAL OFFERS</h1>
            <h4 class="text-light-2" style={{fontWeight:"300"}}>Shop Imperfect Produce™ for a fraction of the price to reduce food waste and save our planet!</h4>
            <Button
                    className="btn-main-two mx-auto pl-md-5 pr-md-5 mt-5"
                  >
                    <a href="/products/imperfect">SHOP IMPERFECT PRODUCE™</a>
                  </Button>
          </Col>
        </Row>
        </div>
      </div>

      <Container>
      <Row className="mt-5 mb-5" id="about-us">
        <Col md="12">
          <h1 className="text-center mx-auto mb-5">
            ABOUT US
          </h1>
        </Col>
      </Row>
      <Row className="mb-5 justify-content-center align-items-center">
        <Col md="6">
          <h3 className="text-start mx-auto">
              Our Mission
            </h3>
          <p>eGROCERY is an emerging online grocery platform launched in 2021, offering vast range of premium quality food products to the citizens of Abu Dhabi.</p>
          <p>Our service launch was preceded by years of careful analysis on market trends in food sector. Inefficient grocery stock management and rising need for quick distribution of time-sensitive edible items made us come up with a vision. We used our observations to take shopping experience to a new level where efficiency and user-friendliness are top priorities.</p>
        </Col>
        <Col md="6">
          <img className="img-fluid" src={process.env.PUBLIC_URL + '/warehouse.jpg'} alt=""/>
        </Col>
      </Row>
      <Row className="mb-5 justify-content-center align-items-center">
        
        <Col md={{ size: 6, order: 2}}>
          <h3 className="text-start mx-auto">
              Our Vision
            </h3>
          <p>eGROCERY vision is to be on the forefront of development in terms of customers’ needs as well as global and local trends. Our strategic partnering with international producers sets us on the path to become the most reliable supplier of fresh groceries in the city, with plans of national expansion in the future. <b><i>At the same time, we cultivate partnerships with Emirati farmers and food suppliers to promote local cooperation.</i></b></p>
        </Col>
        <Col md={{ size: 6, order: 1}}>
            <img className="img-fluid" src='https://www.thenationalnews.com/image/policy:1.1066251:1597916962/RM_20200213_GRACIA30.jpg?f=16x9' alt=""/>
        </Col>
        
      </Row>

      <Row className="mb-5 justify-content-center align-items-center">
        
        <Col md="9" className="border p-4 text-center">

          <h2>Have a suggestion or want to get in touch?</h2>
          <Button className="btn-main-two mx-auto">
            <a href="/contact">CONTACT US</a>
          </Button>
        </Col>
        
      </Row>
      </Container>
      </>
      }


    </>
  )};
};

export default withContext(ProductList);
