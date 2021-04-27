import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Col, Row, Button } from 'reactstrap';

class ViewItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
        product: null,
        _id: ""
      }
      const { match: { params } } = this.props;
      this.state._id = params._id;
      this.setState({_id: params._id});
      console.log(this.state._id);
  }

  async componentDidMount() {
    console.log(this.state._id);
    if(this.state._id !== null){
      // this.state.products = this.props.context;
      console.log("getting item from database");
      const res = await axios.get('https://se-egrocery.herokuapp.com/api/product/' + this.state._id);
      this.setState({product: res.data[0]});
      console.log(res.data);
    }
  }

  render(){
    console.log(this.state.product);
    return (
      <>
      {this.state.product !== null ?
      (<Container>
        <Row className="justify-content-center align-items-center">
          <Col sm="12" md="6" lg="6" className="p-0">
              <img className="img-fluid mx-auto p-2" src={this.state.product.url} alt="" />
          </Col>
          <Col sm="12" md="6" lg="6">
            <small className="text-secondary mb-3 d-block"> {"<"+this.state.product.category+"/" +this.state.product.subcategory+">"} </small>
            <h2 className="mb-3"> {this.state.product.name} </h2>

            <p className="mb-0"> {this.state.product.description} </p>
            <small>Size: {this.state.product.shortDesc} </small>
            <hr className="mb-4"/>

            <div className="mb-3 mt-3">
              <h1 className="d-inline product-price ">{this.state.product.price.toFixed(2)}</h1><h6 className="d-inline"> AED</h6>
            </div>        
            <small className="d-block text-secondary"> {this.state.product.stock} left in stock </small>

            
          </Col>
            
          </Row>

        </Container>)
      : (
      <Container>
      Loading item
      </Container>
      )}
      </>
    );
}};

export default withContext(ViewItem);