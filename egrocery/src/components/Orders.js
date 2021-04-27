import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container, Row, Col } from 'reactstrap';

class Orders extends Component {
  constructor(props) {
      super(props);
      this.state = {
        orders_db: []
      }
      // this.setState({ token: this.props.context });
  }

  async componentDidUpdate() {

        if (this.props.context !== null && this.state.orders_db.length === 0) {

            const { user } = this.props.context;
            if (user !== null){
              const res = await axios.get('https://se-egrocery.herokuapp.com/api/admin/orders',
                                                  {headers: {"x-access-token": user.token}});
              this.setState({orders_db: res.data});

              console.log(res.data)
            }
            else{
              this.setState({orders_db: [{name: "", email:"Error", message: "Oops! You don't have access to this page. Please go back to the homepage!"}]})
            }
        }

  }


  render(){
    return (
      <>
      <Container>
      {this.state.orders_db.map((order, index) => (
        <div className="row" key={index}>
            <div className="col-4 mb-2">

            <h3 className=""> {order.customer.firstName + " " + order.customer.lastName}</h3>
             <small className="text-secondary"> {"<"+order.customer.email+">"} </small>
                <p className="mb-0"> {order.address} </p>
                <p className="mb-0"> {order.address2} </p>
                <p className="mb-0"> {order.area}, {order.city} </p>
                <span className="mb-0 pl-3 pr-3 pb-1 rounded text-capitalize btn-main"><small> {order.paymentMethod} </small></span>
            </div>
            <div className="col-8">
                
                {order.order.map((item, index) => ( 

                              <Row className="mb-3 mx-auto align-items-center shadow-custom rounded">
                                  <Col md="3" className="border-right p-0">
                                    <img className="img-fluid mx-auto p-2" src={item.product.url} alt="" />
                                  </Col>
                                  <Col md="9">
                                    <Row>
                                      <Col md="8">
                                      <h4 className="text-capitalize font-weight-bold mb-0">
                                        {item.product.name}
                                      </h4>
                                      <h6 className="text-secondary">
                                        {item.product.shortDesc}
                                      </h6>
                                    </Col>
                                    <Col md="4" className="text-right">
                                      <div>
                                        <h3 className="d-inline product-price">{item.product.price.toFixed(2)}</h3><h6 className="d-inline"> AED</h6>
                                      </div>
                                    </Col>
                                    </Row>
                                    

                                  </Col>
                                  <Col>
                                  </Col>

                                </Row>



                  ))}
            </div>

            <div className="col-12">
            <hr className="mb-4"/>
            </div>
        </div>
      ))}
      </Container>
      </>
    );
}};

export default withContext(Orders);






