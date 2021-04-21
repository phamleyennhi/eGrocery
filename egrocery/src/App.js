import React, { Component, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Row, Col, Button} from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Contact from './components/Contact';
import Context from "./Context";
import ThankYou from "./components/ThankYou";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      quantity_in_cart: 0,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const products = await axios.get('https://se-egrocery.herokuapp.com/api/products');
    user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};

    this.setState({ user,  products: products.data, cart });
    console.log(this.state.user);
  }

  login = async (email, password) => {
    const res = await axios.post(
      'https://se-egrocery.herokuapp.com/api/auth/signin',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

      if(res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)

      const isAdmin = res.data.roles.includes("ROLE_ADMIN")
      console.log(isAdmin)

      const user = {
        email: res.data.email,
        token: res.data.accessToken,
        accessLevel: isAdmin ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  register = async (email, password) => {
    const res = await axios.post(
      'https://se-egrocery.herokuapp.com/api/auth/signup',
      { email, password, roles:["user"] },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      return true;
    } else {
      return false;
    }
  }



  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    this.state.quantity_in_cart += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(
          `http://localhost:3001/products/${p.id}`,
          { ...p },
        )
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };

  // Navbar burger collapse button
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          register: this.register,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
        
          <Navbar
            className="mb-5 bg-white"
            role="navigation"
            aria-label="main navigation"

          >
          <Container>
            <NavbarBrand href="/" style={{height: "10vh"}}>
              <img style={{height: "100%", width: "auto"}} src="eGROCERY.png" alt=""/>
            </NavbarBrand>
            
            <Nav navbar className={`flex-row ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
              <NavItem>
                <NavLink className="text-secondary" href="/products">Products</NavLink>
              </NavItem>

              {(!this.state.user||(this.state.user && this.state.user.accessLevel > 0)) &&
                (<NavItem>
                <NavLink className="text-secondary" href="/cart">
                  Cart
                  <span
                    className="bg-secondary-custom pl-2 pr-2"
                    style={{ marginLeft: "5px", borderRadius: "3px" }}
                  >
                  <small >
                    <b className="text-white">{ this.state.quantity_in_cart }</b> 
                  </small>
                  </span>
                </NavLink>
                </NavItem>)
              }

              {this.state.user && this.state.user.accessLevel < 1 && (
                <NavItem>
                  <NavLink className="text-secondary" href="/add-product">
                    Add Product
                  </NavLink>
                </NavItem>
              )}

              {(!this.state.user||(this.state.user && this.state.user.accessLevel > 0)) &&
                (
                <NavItem>
                <NavLink className="text-secondary" href="/contact">
                  Contact
                </NavLink>
                </NavItem>
                )
                }
             
                {!this.state.user ? (
                  <NavItem>
                  <NavLink className="text-secondary" href="/login">
                  <Button className="btn-main">
                    Login
                  </Button>
                    
                  </NavLink>
                  </NavItem>
                ) : (
                <NavItem>
                  <NavLink className="text-secondary" href="/" onClick={this.logout}>
                    <Button className="btn-main">
                    Logout
                  </Button>
                  </NavLink>
                  </NavItem>
                )}

            </Nav>
            </Container>

            </Navbar>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/thankyou" component={ThankYou} />
            </Switch>


            <footer className="mt-5">
              <Container fluid className="bg-dark text-light text-center">
                <Container>
                  <Row className="mx-auto">
                    <Col className="lg-6 pt-4 pb-4">
                      <NavbarBrand className="m-0 p-0" href="/" style={{height: "10vh"}}>
                        <img style={{height: "100%", width: "auto"}} src="eGROCERY.png" alt=""/>
                      </NavbarBrand>
                      <br/>
                      All rights reserved
                      <br/>
                      <b>© 2021 eGrocery</b>
                    </Col>
                  </Row>
                </Container>
              </Container>
            </footer>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
