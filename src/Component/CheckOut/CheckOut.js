import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./CheckOut.css";
const CheckOut = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [logedInUser, setLogedInUser] = useContext(userContext);

  useEffect(() => {
    fetch("https://strawberry-shortcake-09710.herokuapp.com/product/" + id)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handelCheckOut = () => {
    console.log(logedInUser.email);
    console.log(logedInUser.displayName);
    const orderDetails = {
      orderBy:logedInUser.displayName,
      orderOwnerEmail: logedInUser.email,
      productName: product.name,
      quantity: 1,      
      wight: product.wight,
      price: product.price,
    };

    fetch("https://strawberry-shortcake-09710.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("order place successfully");
        }
      });
  };
console.log(new Date().toLocaleDateString())
  return (
    <section className="container px-5 check-out-section">
      <article>
        <h2 className="mt-5">CheckOut</h2>
        <Table className="p-5" hover>
          <thead>
            <tr className="text-secondary">
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="border-top border-bottom">
            <tr>
              <td>{product.name}</td>
              <td>1</td>
              <td>${product.price}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>${product.price}</td>
            </tr>
          </tfoot>
        </Table>
        <Button
          variant="success"
          className="ml-auto d-block"
          onClick={handelCheckOut}
        >
          Checkout
        </Button>
      </article>
    </section>
  );
};

export default CheckOut;


