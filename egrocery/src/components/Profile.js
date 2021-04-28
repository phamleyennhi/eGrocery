import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import withContext from "../withContext";


import { Container, Row, Col, Button } from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      disabled: true,
    };
    console.log(this.props);
    this.editInfo = this.editInfo.bind(this);
  }

  editInfo() {
    this.setState(prevState => ({
      disabled: !prevState.disabled
    }));
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
              <Col className="mx-auto col-10">
                <div className="text-center">

                {this.state.user.name == "Jakub" && 
                <img className="img-fluid mx-auto mb-2" src="https://media-exp1.licdn.com/dms/image/C4D03AQEuaoT1xYTeSQ/profile-displayphoto-shrink_200_200/0/1539454747333?e=1623888000&v=beta&t=mfdoEqEzHgocsQFIHBcylxnSYycySL1f77lR_ExBAq8"/>
                }
                {this.state.user.name != "Jakub" && 
                <img className="img-fluid mx-auto mb-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"/>
                }
                <h1>{this.state.user.name} </h1>
                <Button
                  className="btn-main-two btn-sm mx-auto mb-5"
                  onClick={this.editInfo}
                  >
                          Edit Information
                        </Button>
                </div>


                <form onSubmit={this.login}>
                  <div className="field mb-2">
                    <label className="label"><b>Name</b></label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={this.state.user.name}
                      onChange={this.handleChange}
                      required
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="field mb-2">
                    <label className="label"><b>Email</b></label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={this.state.user.email}
                      onChange={this.handleChange}
                      required
                      disabled={this.state.disabled}
                    />
                  </div>
                  <div className="field mb-2">
                    <label className="label"><b>Mobile Phone</b></label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone_number"
                      value={this.state.user.phone_number}
                      onChange={this.handleChange}
                      required
                      disabled={this.state.disabled}
                    />
                  </div>
                
                      
                      
                          
                          <div className="form-group">
                        <Button
                          className="btn-main mx-auto d-block w-100"
                          disabled={this.state.disabled}
                        >
                          UPDATE
                        </Button>
                      </div>

                    </form>
            </Col>
            </Row>
          </Col>
        </Row>
        </Container>)
        : (<Container><p className="loading text-center">Loading user profile...</p></Container>)
      }
      </>
    )
  }
}

export default withContext(Profile);
