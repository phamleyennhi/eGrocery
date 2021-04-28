import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import withContext from "../withContext";


import { Container, Row, Col, Button } from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    console.log(this.props);
  }

  async componentDidUpdate() {

        if (this.props.context !== null && this.state.user === null) {

            const { user } = this.props.context;
            if (user !== null){
              console.log("user is not null");
              console.log(user);
              // const res = await axios.get('https://se-egrocery.herokuapp.com/api/admin/feedback',
              //                                     {headers: {"x-access-token": user.token}});
              // this.setState({feedback_db: res.data});
              this.setState({ user});
            }
            else{
              console.log("user is null");
            }
        }

  }
  render() {
    const user = this.state.user;
    console.log(user);
    return (
      <>
      {this.state.user !== null ? 

      (<Container className="p-0 mb-5">
        <Row className="justify-content-center">
          <Col xs="10" sm="8" md="6" lg="6" className="rounded border p-4 shadow-custom">
            <Row className=" mx-auto pt-3 pb-3">
              <Col className="mx-auto text-center col-10">
                <img className="img-fluid mx-auto mb-5" src="https://media-exp1.licdn.com/dms/image/C4D03AQEuaoT1xYTeSQ/profile-displayphoto-shrink_200_200/0/1539454747333?e=1623888000&v=beta&t=mfdoEqEzHgocsQFIHBcylxnSYycySL1f77lR_ExBAq8"/>

                <h1>{this.state.user.name} </h1>
                <h6 className="text-secondary">Mobile Phone: {this.state.user.phone_number} </h6>
                <h6 className="text-secondary">Email: {this.state.user.email} </h6>
            </Col>
            </Row>
          </Col>
        </Row>
        </Container>)
        : (<Container><p className="loading">Loading user profile...</p></Container>)
      }
      </>
    )
  }
}

export default withContext(Profile);
