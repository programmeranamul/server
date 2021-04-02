import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Products from "../Products/Products";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false)
  useEffect(() => {
    setSpinner(true)
 
    fetch("https://strawberry-shortcake-09710.herokuapp.com/allProduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setSpinner(false)        
      });
 
  }, []);
if(spinner){
  return <Spinner />
}


  return (
    <main className="container main-area">
      <section className="serach-area row justify-content-center p-5">
        <Form className="col-12 col-sm-8 col-lg-6  d-flex align-items-center justify-content-center">
          <Form.Control
            type="text"
            placeholder="Search Here"
            className="search-box"
          />
          <Button variant="success" type="button">
            Submit
          </Button>
        </Form>
      </section>
      <section className="row">
        {products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
