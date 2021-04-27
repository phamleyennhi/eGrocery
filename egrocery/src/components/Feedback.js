import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container } from 'reactstrap';

class Feedback extends Component {
  constructor(props) {
      super(props);
      this.state = {
        feedback_db: []
      }
      // this.setState({ token: this.props.context });
  }

  async componentDidUpdate() {

        if (this.props.context !== null && this.state.feedback_db.length === 0) {

            const { user } = this.props.context;
            if (user !== null){
              const res = await axios.get('https://se-egrocery.herokuapp.com/api/admin/feedback',
                                                  {headers: {"x-access-token": user.token}});
              this.setState({feedback_db: res.data});
            }
            else{
              this.setState({feedback_db: [{name: "", email:"Error", message: "Oops! You don't have access to this page. Please go back to the homepage!"}]})
            }
        }

  }


  render(){
    return (
      <>
      <Container>
      {this.state.feedback_db.map((feedback, index) => (
        <div className="row mb-5 mt-5 border-bottom" key={index}>
            <div className="col-12 mb-2">

            <h3 className="text-end"> {feedback.name} <small className="text-secondary"> {"<"+feedback.email+">"} </small></h3>
                            </div>
            <div className="col-12">
            <p> {feedback.message} </p>

            </div>

        </div>
      ))}
      </Container>
      </>
    );
}};

export default withContext(Feedback);






