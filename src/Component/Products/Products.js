import React from "react";
import { useHistory } from "react-router";

const Products = (props) => {
  const { _id,imageURL, name, wight, price } = props.product;

  const history = useHistory()

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className="p-4 mt-5">
        <img src={imageURL} className="img-fluid item-image" alt={name} />
        <h5>{name} {wight && ` - ${wight}`}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-success">${price}</h4>
          <button className="btn btn-success" onClick={() => history.push(`/product/${_id}`)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
