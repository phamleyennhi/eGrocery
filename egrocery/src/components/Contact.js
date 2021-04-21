import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import withContext from "../withContext";


import { Container, Row, Col, Button } from 'reactstrap';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
    // To ensure 'this' when calling 'this.updateField' refers to Form and not Field, we do:
    this.updateField = this.updateField.bind(this);
  }

  updateField(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(event) {
    console.log('A contact form was submitted');
    event.preventDefault();
    this.props.context.feedback(this.state.name, this.state.email, this.state.message)
      .then( submitted => {
        console.log(this.state.message);
        console.log(submitted);
        this.props.history.push("/thankyou");
      }
      )
    
  }

  render() {
    return (
      <>
      <Container fluid className="p-0 mt-n5 mb-5">
      <div
        style={{height: "50vh", background: "url('/location-map.png')", backgroundSize: "cover", backgroundPosition:"center center", backgroundRepeat: "no-repeat"}}
      ></div>
      </Container>
        <Container>
        <Row className="pt-5 pb-5 align-items-center">
        <Col md="7" >
        <h3>eGrocery Warehouse:</h3>
        <p>Sheikh Khalifa Bin Zayed Al Nahyan Highway (Exit 11)<br/>Saadiyat Island, Abu Dhabi<br/>United Arab Emirates</p>
        <p>Customer Service: contact@egrocery.com<br/>Hotline: +971 69 69 69 69</p>
        
        </Col>
        <Col md="5">
        <img className="img-fluid" src={process.env.PUBLIC_URL + '/warehouse.jpg'} alt=""/>
        </Col>
        </Row>
            <Row>
            <Col lg="6" className="mx-auto shadow-custom rounded p-4">
            <Row className="mx-auto pt-3 pb-3">
              <Col lg="10" className="mx-auto">
                <h1 className="mb-4">Contact Us</h1>
                <p className="pb-3">Got a question? A suggestion? A complaint? Let us know in the form below and we will get back to you within 24 business hours. We hope you enjoy your shopping with us ❤️</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(event) => this.updateField('name', event.target.value)}
                  />
                  </div>
                  <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(event) => this.updateField('email', event.target.value)}
                  />
                  </div>
                  <div className="form-group">
                  <textarea className="form-control"
                    placeholder="Your message starts here..."
                    style={{minHeight: "30vh"}}
                    onChange={(event) => this.updateField('message', event.target.value)}
                  />
                </div>
                <div className="form-group">
                <Button 
                  className="form-control bg-main">
                  SUBMIT
                </Button>
          </div>
        </form>
        </Col>
            </Row>
              

            </Col>
          </Row>

        </Container>
      </>
    )
  }
}

export default withContext(Contact);
