import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Container } from 'reactstrap';

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
      const res = await axios.get('https://se-egrocery.herokuapp.com/api/products/' + this.state._id);
      this.setState({product: res.data});
      console.log(res.data);
    }
  }

  render(){
    return (
      <>
      <Container>
        View item here!
      </Container>
      </>
    );
}};

export default withContext(ViewItem);