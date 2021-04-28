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
  featured: 0,
  url: ""
};

class EditProduct extends Component {
  constructor(props) {
     super(props);
      this.state = {
        _id: "",
        name: "",
        price: "",
        stock: "",
        shortDesc: "",
        description: "",
        category: "",
        featured: 0,
        url: ""
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
      this.setState({
        name: res.data[0].name,
        price: res.data[0].price,
        stock: res.data[0].stock,
        shortDesc: res.data[0].shortDesc,
        description: res.data[0].description,
        category: res.data[0].category,
        featured: res.data[0].featured,
        url: res.data[0].url
      });
      console.log(res.data);

    }
  }

  save = async (e) => {
    e.preventDefault();
    const { name, price, stock, shortDesc, category, featured, description, url } = this.state;

    if (name && price) {

      await axios.post(
        'https://se-egrocery.herokuapp.com/api/product/' + this.state._id,
        { name, price, stock, shortDesc, category, featured, description, url },
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
          featured,
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

  handleChange = e => {

    if(e.target.type === "checkbox"){
      this.setState({[e.target.name]: (e.target.checked  ? 1 : 0), error: ""})
    }else{
      this.setState({ [e.target.name]: e.target.value, error: "" }); 
    }
    console.log(this.state);
  }


  render() {
    const { name, price, stock, shortDesc, category, featured, description, url } = this.state;
    // const { user } = this.props.context;

    return(
      <>
        <div className="container is-max-desktop">
        <form onSubmit={this.save}>
          <div className="row justify-content-center">
            <div className="col-lg-6 rounded border p-4 shadow-custom">
              <div className="row mx-auto pt-3 pb-3">
                <div className="mx-auto col-lg-10">
                <h1 className="mb-5">Edit Product</h1>
                  <div className="field mb-2">
                    <label className="label"><b>Product Name</b></label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="field mb-5">
                    <label htmlFor="category"><b>Category</b></label>
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
                    <label className="label"><b>Image URL</b></label>
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
                  <div className="field mb-5">
                    <label className="label"><b>Packaging information</b></label>
                    <input
                      className="form-control"
                      type="text"
                      name="shortDesc"
                      value={shortDesc}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field mb-2">
                    <label className="label"><b>Price (AED)</b></label>
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      value={price}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="field mb-3">
                    <label className="label"><b>Available in Stock</b></label>
                    <input
                      className="form-control"
                      type="number"
                      name="stock"
                      value={stock}
                      onChange={this.handleChange}
                    />
                  </div>
                   <div className="field mb-5">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input radio-main"
                           onChange={this.handleChange} 
                           checked={featured ? true : false} 
                           id="featured" name="featured"/>
                            <label className="label custom-control-label" htmlFor="featured"><b>Featured</b></label>
                      </div>     
                  </div>
                  
                  <div className="field mb-5">
                    <label className="label"><b>Short Description</b></label>
                    <textarea
                      className="form-control"
                      type="textarea"
                      rows="2"
                      style={{ resize: "none" , minHeight:"20vh"}}
                      name="description"
                      value={description}
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
            </div>
          </div>
        </form>
        </div>
      </>
    );
  }
}

export default withContext(EditProduct);
