import React, { Component } from "react";
// import { Redirect, Link } from "react-router-dom";
import withContext from "../withContext";

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap

import { Container, Row, Col, Button } from 'reactstrap';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.shipping_fee = 10;
        this.total_price = 0;
        const { cart } = props.context;
        this.cartKeys = Object.keys(cart || {});
        const order = [];

        for (var item of this.cartKeys){
          var amount = cart[item].amount;
          var price = cart[item]["product"]["price"];
          this.total_price += amount*price;
          order.push(cart[item]);
          if (this.total_price >= 100) this.shipping_fee = 0;
        }

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            paymentMethod: "",
            sameAddress: false,
            saveInfo: false,
            address: "",
            address2: "",
            city: "",
            area: "",
            card: {
              name: "",
              number: "",
              exp: "",
              cvv: "",
            },
            order: order,
            error: {
              firstName: false,
              lastName: false,
              email: false,
              paymentMethod: false,
              sameAddress: false,
              saveInfo: false,
              address: false,
              address2: false,
              city: false,
              area: false,
              cardName: false,
              cardNumber: false,
              cardExp: false,
              cardCvv: false
            },
            submitted: false,
        };

  	}


  	handleChange = e => {

  		if(e.target.type === "radio"){
  			this.setState({
    		    [e.target.name]: e.target.id
    		})
  		}else if (e.target.type === "checkbox") {
  			this.setState({
    		    [e.target.name]: e.target.checked
    		})

  		}else if(e.target.id[0] === "7"){

        const card = {
          ...this.state.card,
          [e.target.name]: e.target.value,
        }

        this.setState({ card });

        console.log(card)

      }else{
  			this.setState({
        		[e.target.name]: e.target.value
    		})
  		}

      if(this.state.submitted){
        this.validate();
      }



    console.log(this.state)
  }
  	
    validate = () => {
      const error = {              
          firstName: false,
          lastName: false,
          email: false,
          paymentMethod: false,
          sameAddress: false,
          saveInfo: false,
          address: false,
          address2: false,
          city: false,
          area: false,
          cardName: false,
          cardNumber: false,
          cardExp: false,
          cardCvv: false
      };

      if(!this.state.firstName){
         error.firstName = true;
      }
      if(!this.state.lastName){
         error.lastName = true;
      }
      if(!this.state.email){
         error.email = true;
      }
      if(!this.state.address){
         error.address = true;
      }
      if(!this.state.paymentMethod){
         error.paymentMethod = true;
      }
      if(!this.state.city){
         error.city = true;
      }
      if(this.state.paymentMethod !== "cash"){
         
          if(!this.state.card.name){
            error.cardName = true;
          }
          if(this.state.card.number.length < 19 ){
            error.cardNumber = true;
          }
          if(this.state.card.exp.length < 5){
            error.cardExp = true;
          }
          if(this.state.card.cvv.length < 3){
            error.cardCvv = true;
          }
      }

      this.setState({error})

      return error;
    }

  	checkout = (e) => {    
      e.preventDefault();
      this.setState({submitted: true});
      const errors = this.validate();

      for(const err in errors){
        if(errors[err] === true){
            return;
        }
      }

      const req = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            paymentMethod: this.state.paymentMethod,
            address: this.state.address,
            address2: this.state.address2,
            city: this.state.city,
            area: this.state.area,
            card: this.state.card,
            order: this.state.order
      };

      this.props.context.checkout(req);

    };


    render() {
        return (

		<Container>
			<Row className="mb-2">
				<h1>Checkout</h1>
			</Row>

      <Row className="mb-5 ">
        <a className="d-md-block d-none" href="/cart">↩ Return to cart</a>
      </Row>

			<Row>
				<Col lg={{ size: 4, order: 2}}>
					<div className="p-3 mb-5 align-items-left shadow-custom rounded">
					<h3 className="mb-2">
						Order Summary
					</h3>
          <small><a href="/cart">↩ Return to cart</a></small>

					
          <table class="table table-borderless mt-3">
            <tbody>
              <tr>
                <th scope="row">Items <small className="badge bg-secondary-custom text-white rouded">{ this.props.context.quantity_in_cart }</small>
</th>
                <td className="text-right" >{ Math.round(this.total_price * 100) / 100 } AED</td>
                
              </tr>
              <tr className="pb-4">
                <th className="pb-4" scope="row">Shipping Fee</th>
                <td className="pb-4 text-right">{this.shipping_fee == 0 ? <span class="badge badge-main">FREE</span> : this.shipping_fee + " AED"}</td>
                
              </tr>
              
            </tbody>
            <tfoot className="border-top">
              <tr className="pt-4">
                <th className="pt-4" scope="col">Total</th>
                <th className="pt-4 text-right" scope="col">{ Math.round(this.total_price * 100) / 100 +  this.shipping_fee} AED</th>
                
              </tr>
            </tfoot>
          </table>

					</div>
				</Col>

				<Col lg={{ size: 8, order: 1}}>
					<div className="p-3 align-items-left shadow-custom rounded">

					<form className="needs-validation" onSubmit={this.checkout} noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.firstName ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
              name="firstName" id="firstName" value={this.state.firstName} placeholder="John" onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.lastName ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
             name="lastName" id="lastName" value={this.state.lastName} placeholder="Smith" onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="email">Email </label>
          <input type="email" className={ this.state.submitted ? (this.state.error.email ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
           name="email" id="email" value={this.state.email} placeholder="you@example.com" onChange={this.handleChange} required/>
          <div className="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className={ this.state.submitted ? (this.state.error.address ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
           name="address" id="address" value={this.state.address} placeholder="1234 Main St" onChange={this.handleChange} required/>
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>
        </div>

        <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
          <input type="text" className={ this.state.submitted ? (this.state.error.address2 ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
           name="address2" id="address2" value={this.state.address2} placeholder="Apartment or suite" onChange={this.handleChange}/>
        </div>
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="city">City</label>
            <select className={ this.state.submitted ? (this.state.error.city ? "custom-select d-block w-100 is-invalid" : "custom-select d-block w-100 is-valid") : ("custom-select d-block w-100")} 
             name="city" id="city" value={this.state.city} onChange={this.handleChange} required>
              <option value="">Choose...</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid city.
            </div>
          </div>
          <div className="col-md-7 mb-3">
            <label htmlFor="area">Area</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.area ? "form-control is-invalid" : "form-control is-valid") : ("form-control")} 
             name="area" id="area" value={this.state.area} onChange={this.handleChange} placeholder="District"/>
            <div className="invalid-feedback">
              Please provide a valid area.
            </div>
          </div>
        </div>


        <hr className="mb-4"/>

        <div className="row">
        <div className="col-md-12 mb-2">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className={ this.state.submitted ? (this.state.error.sameAddress ? "custom-control-input radio-main is-invalid" : "custom-control-input radio-main is-valid") : ("custom-control-input radio-main")} 
          onChange={this.handleChange} checked={this.state.sameAddress ? 'checked': false} id="sameAddress" name="sameAddress"/>
          <label className="custom-control-label" htmlFor="sameAddress">Shipping address is the same as my billing address</label>
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className={ this.state.submitted ? (this.state.error.saveInfo ? "custom-control-input radio-main is-invalid" : "custom-control-input radio-main is-valid") : ("custom-control-input radio-main")}
           onChange={this.handleChange} checked={this.state.saveInfo ? 'checked': false} id="saveInfo" name="saveInfo"/>
          <label className="custom-control-label" htmlFor="saveInfo">Save this information for next time</label>
        </div>
        </div>
        </div>

        <hr className="mb-4"/>

        <div className="row">
        <div className="col-md-12 mb-2">

        <h4 className="mb-3">Payment</h4>

        <div className="d-block my-3">
          <div className="custom-control custom-radio">
            <input id="credit" name="paymentMethod" type="radio" className="custom-control-input radio-main" value={this.state.paymentMethod === "credit"} onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="credit">Credit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="debit" name="paymentMethod" type="radio" className="custom-control-input radio-main" value={this.state.paymentMethod === "debit"} onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="debit">Debit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="cash" name="paymentMethod" type="radio" className="custom-control-input radio-main" value={this.state.paymentMethod === "cash"} onChange={this.handleChange} required/>
            <label className="custom-control-label" htmlFor="cash">Cash on delivery</label>
          </div>
        </div>
        </div>
		</div>


		{this.state.paymentMethod !== "cash" ? (

		<div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="7cc-name">Name on card</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.cardName ? "form-control is-invalid" : "form-control is-valid") : ("form-control")}
             id="7cc-name" name="name" placeholder="" value={this.state.card.name} onChange={this.handleChange} required/>
            <small className="text-muted">Full name as displayed on card</small>
            <div className="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="7cc-number">Credit card number</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.cardNumber ? "form-control is-invalid" : "form-control is-valid") : ("form-control")}
             id="7cc-number" name="number" placeholder="0000-0000-0000-0000" pattern="/^([0-9]{4}( |\-)){3}[0-4]{4}$/" maxLength="19" value={this.state.card.number} onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="7cc-expiration">Expiration</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.cardExp ? "form-control is-invalid" : "form-control is-valid") : ("form-control")}
            id="7cc-expiration" name="exp" placeholder="00/00 " pattern="\d*" maxLength="5" value={this.state.card.exp} onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="7cc-cvv">CVV</label>
            <input type="text" className={ this.state.submitted ? (this.state.error.cardCvv ? "form-control is-invalid" : "form-control is-valid") : ("form-control")}
             id="7cc-cvv" name="cvv" placeholder="000" pattern="\d*" maxLength="3" value={this.state.card.cvv} onChange={this.handleChange} required/>
            <div className="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        </div>
        ) : (
        <hr className="mb-4"/>
        ) }

        <Button className="btn-main mx-auto d-block w-100" type="submit">
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



// {this.cartKeys.map(key => (
//                  <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="text-capitalize">{ this.props.context.cart[key].product.name }</span>
//             <span className="text-end">
//                 <span className="text-muted"> { this.props.context.cart[key].amount } </span> 
//                 x 
//                 <span> { this.props.context.cart[key].product.price } AED</span>
//                 <span className="font-weight-bold ml-2"> {this.props.context.cart[key].product.price*this.props.context.cart[key].amount} AED</span>
                
//             </span>
//                  </div>
//                 ))}