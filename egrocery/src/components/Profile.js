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

      (<Container fluid className="p-0 mt-n5 mb-5">
        <div className="row">
            <div className="col-12 mb-2">

            <h4 className="text-end"> {this.state.user.name} <small className="text-secondary"> {this.state.user.phone_number} </small></h4>
                            </div>
            <div className="col-12">
            <p style={{"white-space": "pre-line"}}> {this.state.user.email} </p>
                        <hr className="mb-4"/>

            </div>

        </div>

        </Container>)
        : (<div> Loading user profile... </div>)
      }
      </>
    )
  }
}

export default withContext(Profile);
