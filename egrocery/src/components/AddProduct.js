import React, { Component } from "react";
import withContext from "../withContext";
import axios from 'axios';

const initState = {
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
  category: "",
  url: ""
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { name, price, stock, shortDesc, category, description, url } = this.state;

    if (name && price) {

      await axios.post(
        'https://se-egrocery.herokuapp.com/api/products/add',
        { name, price, stock, shortDesc, category, description, url },
        {headers: {
          "x-access-token": this.props.context.user.token
        }}
      )

      this.props.context.addProduct(
        {
          name,
          price,
          shortDesc,
          description,
          category,
          stock: stock || 0,
          url
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product created successfully' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
      );
    }
  };

  handleChange = e => {this.setState({ [e.target.name]: e.target.value, error: "" }); console.log(this.state)}

  render() {
    const { name, price, stock, shortDesc, category, description, url } = this.state;
    // const { user } = this.props.context;

    return(
      <>
        <div className="container">
          <div className="row">
            <h4 className="ml-2">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="container is-max-desktop">
        <form onSubmit={this.save}>
          <div className="row justify-content-center">
            <div className="col-md-6 col-12">
              <div className="field mb-2">
                <label className="label">Product Name: </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field mb-2">
                <label className="label">Price: </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field mb-2">
                <label className="label">Available in Stock: </label>
                <input
                  className="form-control"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field mb-2">
                <label className="label">Country of Origin: </label>
                <input
                  className="form-control"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field mb-2">
                <label className="label">Short Description: </label>
                <textarea
                  className="form-control"
                  type="textarea"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>

               <div className="field mb-2">
                <label htmlFor="category">Category</label>
                <select className="custom-select d-block w-100" id="category" name="category" value={category} onChange={this.handleChange} required>
                  <option value="">Choose...</option>
                  <option value="Bread & Bakery">Bread & Bakery</option>
                  <option value="Breakfast & Cereal">Breakfast & Cereal</option>
                  <option value="Canned Goods & Soups">Canned Goods & Soups</option>
                  <option value="Cookies, Snacks & Candy">Cookies, Snacks & Candy</option>
                  <option value="Dairy, Eggs & Cheese">Dairy, Eggs & Cheese</option>
                  <option value="Grains, Pasta & Sides">Grains, Pasta & Sides</option>
                  <option value="Fruit & Vegetables">Fruit & Vegetables</option>
                  <option value="Meat">Meat</option>
                </select>
              </div>


              <div className="field mb-2">
                <label className="label">Image URL: </label>
                <input
                  className="form-control"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="url"
                  value={url}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="row justify-content-end">
                <button
                  className="btn btn-main text-end  mt-3 d-block"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </>
    );
  }
}

export default withContext(AddProduct);
