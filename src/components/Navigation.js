import { Button, Nav, Navbar } from "react-bootstrap";
import React, { Component } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import history from "../utils/history";

class Navigation extends Component {
  handleLogout = () => {
    localStorage.removeItem("roles");
    history.push("/");
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/app" style={{ color: "#fff" }}>
            Role-Based-Access-Control
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {this.props.routes.map((route) => (
            <Link
              key={route.url}
              className="nav-link"
              to={`${this.props.path}${route.url}`}
            >
              {route.title}
            </Link>
          ))}
        </Nav>
        <Button onClick={this.handleLogout}>Logout</Button>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  path: PropTypes.string.isRequired,
};

export default Navigation;
