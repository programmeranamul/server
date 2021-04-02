import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { Table } from "react-bootstrap";
import { userContext } from "../../App";
import LogInUserDetails from "../LogInUserDetails/LogInUserDetails";
import Spinner from "../Spinner/Spinner";
const Order = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const [spinner, setSpinner] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    setSpinner(true);
    fetch(
      "https://strawberry-shortcake-09710.herokuapp.com/booking?email=" +
        logedInUser.email
    )
      .then((res) => res.json())
      .then((mybookings) => {
        setMyBookings(mybookings);
        setSpinner(false);
      });
  }, []);

  if (spinner) {
    return <Spinner />;
  }
  return (
    <section className="container order-section">
      {/* Loged In User Details Start*/}
      <LogInUserDetails />
      {/* Loged In User Details End*/}
      <article className="mt-5">
        <h5>Your Orders : {myBookings.length}</h5>
        <Table striped bordered hover>
          <thead className="border-bottom">
            <tr>
              <th>Product Name</th>
              <th>Wight</th>
              <th>PlaceDate</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.productName}</td>
                <td>{booking.wight}</td>
                <td>{booking.placeDate}</td>
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
