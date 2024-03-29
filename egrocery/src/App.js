import React, { Component, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import {  Dropdown, Container, Row, Col, Button} from 'reactstrap';
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
import EditProduct from './components/EditProduct';
import AdminProductList from './components/AdminProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Contact from './components/Contact';
import Context from "./Context";
import ThankYou from "./components/ThankYou";
import Checkout from "./components/Checkout";
import Feedback from "./components/Feedback";
import ViewItem from "./components/ViewItem";
import Orders from "./components/Orders";
import Profile from "./components/Profile"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      quantity_in_cart: 0,
      cart: {},
      products: [],
      search_pattern:"",
      alert: "",
      dropdownOpen: false,
    };
    this.routerRef = React.createRef();

    const category_dict = {"Bread & Bakery":"bakery", "Breakfast & Cereal":"breakfast", "Canned Goods & Soups":"soups", "Dairy, Eggs & Cheese":"dairy", "Grains, Pasta & Sides":"grains", "Fruit & Vegetables":"fruit", "Meat":"meat", "Cookies, Snacks & Candy":"snacks"};
  
    this.toggle = this.toggle.bind(this);
  }

  // Dropdown menu
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    let cart = localStorage.getItem("cart");
    cart = cart? JSON.parse(cart) : {};
    let quantity_in_cart = localStorage.getItem("quantity_in_cart");
    if (quantity_in_cart == null){
      quantity_in_cart = 0;
    }
    else quantity_in_cart = parseInt(quantity_in_cart);
    this.setState({ user, quantity_in_cart, cart });
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
      console.log(res.data);
      const user = {
        email: res.data.email,
        token: res.data.accessToken,
        name: res.data.name,
        phone_number: res.data.phone_number,
        accessLevel: isAdmin ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      return true;
    } else {
      return false;
    }
  }

  register = async (name, email, phone_number, password) => {
    console.log(name +", " + email + ", " + phone_number + ", " + password);
    const res = await axios.post(
      'https://se-egrocery.herokuapp.com/api/auth/signup',
      { email, password, name, phone_number, roles:["user"] },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      this.addAlert("Succesfully registered! Log in to your new account!");
      return true;
    } else {
      return false;
    }
  }


   saveProfile = async (name, email, phone_number) => {

      const {user} = this.state


      if (name && phone_number) {

        await axios.post(
          'https://se-egrocery.herokuapp.com/api/profile/edit',
          { name, email, phone_number},
          {headers: {
            "x-access-token": this.state.user.token
          }}
        );

        user.name = name;
        user.phone_number = phone_number;

        this.setState({user});
        localStorage.setItem("user", JSON.stringify(user));
        this.addAlert("Profile updated!");
      }
    };



  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    this.addAlert("Succesfully logged out!");
    localStorage.removeItem("user");
    this.clearCart();
    this.routerRef.current.history.push("/products");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    let products = this.state.products;
    console.log(products);
    console.log(cartItem.id)
    
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
      this.addAlert("You've added all the available " +cart[cartItem.id].product.name+ " in stock!");
    }
    else {
      this.state.quantity_in_cart += 1;
      this.addAlert(cart[cartItem.id].product.name+" added to cart!")
    }
    console.log("cartItem.amount:", cartItem.amount);
    console.log("cartItem:", cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.removeItem("quantity_in_cart");
    localStorage.setItem("quantity_in_cart", JSON.stringify(this.state.quantity_in_cart));
    this.setState({ cart });
  };


  deleteProduct = async (productItem) => {

    const res = await axios.delete(`https://se-egrocery.herokuapp.com/api/product/${productItem.product._id}`,
                                                  {headers: {"x-access-token": this.state.user.token}})
    .catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    });

    this.addAlert("Succesfully remove product!");
    return { status: 200, message: 'Item Deleted!' }

  }

  editCartQuantity = (cartItem, cartItemId, change) => {
    let cart = this.state.cart;
    let quantity_in_cart = localStorage.getItem("quantity_in_cart");
    quantity_in_cart = parseInt(quantity_in_cart);
    if (change === 1){
        if (cart[cartItem.id].amount >= cart[cartItem.id].product.stock) {
          cart[cartItem.id].amount = cart[cartItem.id].product.stock;
          this.addAlert("You've added all the available " +cart[cartItem.id].product.name+ " in stock!");
        }
        else{
          quantity_in_cart = parseInt(quantity_in_cart) + change;
          cart[cartItem.id].amount += change;
        }
    }
    else{
        quantity_in_cart = parseInt(quantity_in_cart) + change;
        cart[cartItem.id].amount += change;
    }
    if(cart[cartItem.id].amount <= 0){
      this.removeFromCart(cartItemId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantity_in_cart", JSON.stringify(quantity_in_cart));
    this.setState({ cart });
    this.setState({ quantity_in_cart });
  }


  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    let quantity_in_cart = localStorage.getItem("quantity_in_cart");
    quantity_in_cart = parseInt(quantity_in_cart) - cart[cartItemId].amount;
    localStorage.setItem("quantity_in_cart", JSON.stringify(quantity_in_cart));

    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
    this.setState({ quantity_in_cart });
  };

  clearCart = () => {
    let cart = {};
    let quantity_in_cart = 0;
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity_in_cart");
    // localStorage.setItem("quantity_in_cart", 0);
    this.setState({ cart });
    this.setState({quantity_in_cart: 0});
  };

  checkout = async (req) => {

    const res = await axios.post(
      'https://se-egrocery.herokuapp.com/api/order', 
      req, 
      {headers: {"x-access-token": this.state.user.token}}
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })



    this.routerRef.current.history.push("/products");
    this.clearCart();
    this.addAlert("Succesfully checked out!");
  };


  feedback = async (name, email, message) => {
    const res = await axios.post(
      'https://se-egrocery.herokuapp.com/api/feedback',
      { name, email, message },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      return true;
    } else {
      return false;
    }
  };


  addAlert = message => {
    this.setState({alert: message});


    if(this.alertTimeout){
      clearTimeout(this.alertTimeout);
    }

    this.alertTimeout = setTimeout(() => {
          this.setState({
            alert: "",
          });
      }, 3000);
  }

  render() {
    const user = this.state.user;
    console.log(user);
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
          checkout: this.checkout,
          editCartQuantity: this.editCartQuantity,
          feedback: this.feedback,
          deleteProduct: this.deleteProduct,
          addAlert: this.addAlert,
          saveProfile: this.saveProfile
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
        
          <Navbar
          style={{zIndex:"200"}}
            className="shadow-custom mb-5 bg-white"
            role="navigation"
            aria-label="main navigation"

          >
          <Container>
            <NavbarBrand href="/" style={{height: "10vh"}}>
              <img style={{height: "100%", width: "auto"}} src="/eGROCERY.png" alt=""/>
            </NavbarBrand>
            
            <Nav navbar className={`flex-row ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
              
              {(user && user.accessLevel === 0) ? 
                (<>
                <NavItem>
                <NavLink className="text-secondary" href="/products">Catalog</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="text-secondary" href="/admin-products">Edit Product</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-secondary" href="/add-product">
                    Add Product
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-secondary" href="/feedback">
                    Feedback
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-secondary" href="/orders">
                    Orders
                  </NavLink>
                </NavItem>
                </>)
                :
                (<>
                <NavItem>
                <NavLink className="text-secondary" href="/products/">Products</NavLink>
                </NavItem>
                <NavItem>
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
                </NavItem>
                <NavItem>
                <NavLink className="text-secondary" href="/contact">
                  Contact
                </NavLink>
                </NavItem>
                </>)
              }
             
              {!user ? (
                <NavItem>
                <NavLink className="text-secondary" href="/login">
                <Button className="btn-main">
                  Login
                </Button>
                  
                </NavLink>
                </NavItem>
              ) : (
              <NavItem>
              <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret className="btn-main">
                <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                </span>
                  <span>Hi {this.state.user.name}!</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Link to="/profile">Profile</Link></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}><small>Logout</small></DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </NavItem>
              )}

            </Nav>
            </Container>

            </Navbar>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/admin-products" >
                <Route exact path="/admin-products" component={AdminProductList} />
                <Route exact path="/admin-products/:category/" component={AdminProductList} />
              </Route>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route path="/products" >
                <Route exact path="/products" component={ProductList} />
                <Route exact path="/products/:category" component={ProductList} />
              </Route>
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/thankyou" component={ThankYou} />
              <Route exact path="/feedback" component={Feedback} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/view-item/:_id" component={ViewItem} />
              <Route exact path="/edit-product/:_id" component={EditProduct} />
              <Route exact path="/profile" component={Profile} />
            </Switch>

            
                <Container fluid className="alert-container">
                <Row className="justify-content-center">
  
                    <div className="col-lg-4 mx-auto">
                    <small>
                    <div className={this.state.alert ? "text-center alert alert-custom alert-dismissible fade show p-2" : "alert alert-custom alert-dismissible fade" } role="alert">
                      {this.state.alert}
                        
                    </div>
                    </small>
                    </div>
                  
                </Row>
                </Container>

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