import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            paymentMethod: ""
        };

        console.log(props);
		
		this.total_price = 0;
        const { cart } = props.context;
  		this.cartKeys = Object.keys(cart || {});

  		for (var item of this.cartKeys){
   			var amount = cart[item].amount;
    		var price = cart[item]["product"]["price"];
    		this.total_price += amount*price;
    	}
  	}


  	handleChange = e => {this.setState({
        [e.target.name]: e.target.value,
        error: ""
    })

    console.log(this.state)
  }
  	

  	checkout = (e) => {
       
    };


    render() {
        return (

		<Container>
			<Row className="mb-5">
				<h1>Checkout</h1>
			</Row>

			<Row>
				<Col lg={{ size: 4, order: 2}}>
					<div className="p-3 mb-5 align-items-left shadow-custom rounded">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-capitalize font-weight-bold">Your cart</span>
						<span className="badge bg-secondary-custom text-white rouded">{ this.props.context.quantity_in_cart }</span>
					</h4>

					{this.cartKeys.map(key => (
		             <div className="d-flex justify-content-between align-items-center mb-2">
		             	<span className="text-capitalize">{ this.props.context.cart[key].product.name }</span>
						<span className="">
								<span className="text-muted"> { this.props.context.cart[key].amount } </span> 
								x 
								<span> { this.props.context.cart[key].product.price } AED/kg</span>
								<span className="font-weight-bold ml-2"> {this.props.context.cart[key].product.price*this.props.context.cart[key].amount} AED</span>
								
						</span>
		             </div>
		            ))}

					<hr/>

					<h6 className="d-flex justify-content-between align-items-center mt-3 mb-3">
						<span className="text-capitalize font-weight-bold">Total</span>
						<span className="font-weight-bold">{ this.total_price } AED</span>
					</h6>

					</div>
				</Col>

				<Col lg={{ size: 8, order: 1}}>
					<div className="p-3 align-items-left shadow-custom rounded">

					<form className="needs-validation" noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input type="text" className="form-control" name="firstName" placeholder="John" onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input type="text" className="form-control" name="lastName" placeholder="Smith" onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="email">Email </label>
          <input type="email" className="form-control" name="email" placeholder="you@example.com"/>
          <div className="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" name="address" placeholder="1234 Main St" required/>
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
          <input type="text" className="form-control" name="address2" placeholder="Apartment or suite"/>
        </div>
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="city">City</label>
            <select className="custom-select d-block w-100" name="city" required>
              <option value="">Choose...</option>
              <option>Abu Dhabi</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid city.
            </div>
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="area">Area</label>
            <input type="text" className="form-control" name="area" placeholder="District"/>
            <div className="invalid-feedback">
              Please provide a valid area.
            </div>
          </div>
        </div>


        <hr className="mb-4"/>

        <div className="row">
        <div className="col-md-12 mb-2">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" name="same-address"/>
          <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" name="save-info"/>
          <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
        </div>
        </div>
        </div>

        <hr className="mb-4"/>

        <div className="row">
        <div className="col-md-12 mb-2">

        <h4 className="mb-3">Payment</h4>

        <div className="d-block my-3">
          <div className="custom-control custom-radio">
            <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="credit">Credit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="debit">Debit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="cash" name="paymentMethod" type="radio" className="custom-control-input" onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="cash">Cash on delivery</label>
          </div>
        </div>
        </div>
		</div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input type="text" className="form-control" name="cc-name" placeholder="" required/>
            <small className="text-muted">Full name as displayed on card</small>
            <div className="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-number">Credit card number</label>
            <input type="text" className="form-control" name="cc-number" placeholder="" required/>
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-expiration">Expiration</label>
            <input type="text" className="form-control" name="cc-expiration" placeholder="" required/>
            <div className="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-cvv">CVV</label>
            <input type="text" className="form-control" name="cc-cvv" placeholder="" required/>
            <div className="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>


        <hr className="mb-4"/>
        <Button className="btn-main mx-auto d-block w-100">
							Continue to checkout
							</Button>
      </form>




					{/*<form className="needs-validation" onSubmit={this.checkout}>
                		<div className="form-group">

								<div class="row">
									<div class="col-md-6 mb-3">
										<label htmlFor="firstName">First name</label>
										<input type="text" class="form-control" id="firstName" placeholder="Name" value="" required/>
										<div class="invalid-feedback">
											Valid first name is required.
										</div>
									</div>
									<div class="col-md-6 mb-3">
										<label for="lastName">Last name</label>
										<input type="text" class="form-control" id="lastName" placeholder="Last" value="" required/>
										<div class="invalid-feedback">
											Valid last name is required.
										</div>
									</div>
								</div>

					    </div>
			            <div className="form-group">
							<Button className="btn-main mx-auto d-block w-100">
							CHECKOUT
							</Button>
                    	</div>
       	 			</form>*/}
					</div>
				</Col>
			</Row>
		</Container>);
    }
}
export default withContext(Checkout);

