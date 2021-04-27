import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Link } from "react-router-dom";

import { Row, Col, Button } from 'reactstrap';

var displayMsg = 0;
var id = null;
function displayMessage(_id){
  displayMsg = 1;
  id = _id;
  // return alert("Product Added");
}

function hideMessage(){
  displayMsg = 0;
  // return alert("Product Added");
}
const ProductItem = props => {
  const { product } = props;
  return (
  <Col sm="6" lg="4" xl="3" className="p-4 product-item">
    <Row className="mx-auto text-center align-items-center justify-content-center shadow-custom rounded" style={{"height": "100%"}}>
      <Col md="12" className="border-bottom p-0 product-image-wrapper">
        <Link to={`/view-item/${product._id}`}><img className="img-fluid mx-auto p-2 product-image" src={product.url} alt="" /></Link>
      </Col>
      <Col md="12" className="mt-3">
        <h5 className="text-capitalize font-weight-bold mb-0 product-name">
          <Link to={`/view-item/${product._id}`}>{product.name}</Link>
        </h5>
        {product.category == "Ugly" ? 
          <h6 className="font-weight-bold text-secondary-custom mt-1">
           {product.description}!
          </h6> 
        :         
        <h6 className="text-secondary">
          {product.shortDesc}
        </h6> 
      }
        <div className=" mt-3">
          <h2 className="d-inline product-price">{product.price.toFixed(2)}</h2><h6 className="d-inline"> AED</h6>
        </div>
        <div>

        </div>
        <Button
                className="btn-main mt-4"
                onClick={() =>
                  {props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  }); props.addAlert(product.name+" added to cart!")}
                }
              >
                ADD
        </Button>
        {(displayMsg === 1 && id === product.name) ? (<> <div> <p className="text-secondary-custom"> Product added </p> </div> </>) : (<div> </div>) }
        {(displayMsg === 1 && id === product.name) ? (hideMessage()) : (<div> </div>)}
        <p className="text-secondary">
          {product.stock > 0 ? (
              <small>{product.stock + " in stock"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
        </p>  
      </Col>
    </Row>
  </Col>
  );
};

export default ProductItem;
