import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { Table } from "react-bootstrap";
import { userContext } from "../../App";
import LogInUserDetails from "../LogInUserDetails/LogInUserDetails";
const Order = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);

  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetch("https://strawberry-shortcake-09710.herokuapp.com/booking?email=" + logedInUser.email)
      .then((res) => res.json())
      .then((mybookings) => setMyBookings(mybookings));
  }, []);

  return (
    <section className="container">
      {/* Loged In User Details Start*/}
      <LogInUserDetails />
      {/* Loged In User Details End*/}
      <article className="mt-5">
        <h5>Your Orders : {myBookings.length}</h5>
        <Table striped bordered hover>
          <thead className="border-bottom">
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking) => (
              <tr>
                <td>{booking.productName}</td>
                <td>{booking.quantity}</td>
                <td>{"$" + booking.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </article>
    </section>
  );
};

export default Order;
