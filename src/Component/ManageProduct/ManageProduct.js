import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageProduct.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("https://strawberry-shortcake-09710.herokuapp.com/allProduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handelDeletProduct = (productId) => {
    fetch(
      `https://strawberry-shortcake-09710.herokuapp.com/deletProduct/${productId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => fetchProducts());
  };

  return (
    <section className="container maneg-product-container">
      <div className="row">
        <SideMenu />
        <div className="col-sm-9">
          <h4 className="mb-3 mt-4">Manage Product</h4>
          <Table bordered hover className="maneg-product-table">
            <thead className="border-bottom">
              <tr>
                <th>Product Name</th>
                <th>Wight</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.wight}</td>
                  <td>${product.price}</td>
                  <td>
                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => handelDeletProduct(product._id)}
                      className="delet-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
