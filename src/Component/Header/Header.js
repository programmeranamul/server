import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  return (
    <header className="bg-success">
      <Navbar expand="lg" className="container">
        <Navbar.Brand as={Link} to="/">
          Fress Food
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/order">
              Order
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/deals">
              Deals
            </Nav.Link>
            {logedInUser.displayName || logedInUser.email ? (
              <Nav.Link as={Link} to="/profile">
                <img
                  className="avatar"
                  src={logedInUser.photoURL || "https://i.ibb.co/JqYKzYK/avatar.jpg"}
                  alt={logedInUser.displayName || logedInUser.email}
                />
              </Nav.Link>
            ) : (
              <Button as={Link} to="/logIn" variant="danger" className="ml-4">
                LogIn
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
