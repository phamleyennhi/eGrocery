import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Col } from 'reactstrap';

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
      (<div className="row">
            <div className="col-12 mb-2">

            <h4 className="text-end"> {this.state.product.name} <small className="text-secondary"> {"<"+this.state.product.category+"/" +this.state.product.subcategory+">"} </small></h4>
                            </div>
            
            <div className="col-12">
            <p style={{"white-space": "pre-line"}}> {this.state.product.description} </p>
                        <hr className="mb-4"/>
            </div>
            <div className="col-12">
            <p style={{"white-space": "pre-line"}}> {this.state.product.shortDesc} </p>
                        <hr className="mb-4"/>
            <p style={{"white-space": "pre-line"}}> {this.state.product.price} AED </p>
                        <hr className="mb-4"/>
            <p style={{"white-space": "pre-line"}}> {this.state.product.stock} left in stock </p>
                        <hr className="mb-4"/>
            <Col md="12" className="border-bottom p-0 product-image-wrapper">
              <img className="img-fluid mx-auto p-2 product-image" src={this.state.product.url} alt="" />
            </Col>
            </div>

        </div>)
      : (
      <Container>
      Loading item
      </Container>
      )}
      </>
    );
}};

export default withContext(ViewItem);