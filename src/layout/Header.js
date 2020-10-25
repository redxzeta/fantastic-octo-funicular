import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../services/FirebaseDashboard";
export default function Header({ authenticated }) {
  const onSignOut = () => {
    auth()
      .signOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {authenticated ? (
          <Button onClick={onSignOut} variant="secondary">
            Logout
          </Button>
        ) : (
          <>
            <Button as={Link} to="/login" variant="secondary">
              Login
            </Button>
            <Button as={Link} to="/register" variant="secondary">
              Register
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
