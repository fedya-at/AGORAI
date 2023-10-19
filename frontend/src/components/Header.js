import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions.js';
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
  <Navbar expand="lg" variant="light" collapseOnSelect style={{ backgroundColor: "#F9F5E7" }}>
        <Container>
          <Navbar.Brand rand="true" href="/" className="text-dark mx-12">
          AGORAI
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="#" className="text-dark">
              <i className="fa fa-star"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="text-dark">
              <i className="fa fa-filter"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="text-dark">
              <i className="fa fa-search"></i>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/cart" className="text-dark">
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
          </Nav.Item>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/profile" className="text-dark">
                  <i className="fa fa-user"> </i> Profile
                </Nav.Link>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item onClick={logoutHandler}>
                <i className="fa fa-sign-out"> </i> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                <i className="fas fa-user"> </i> Sign In
              </Nav.Link>
            </Nav.Item>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Panel" id="adminmenu">
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/admin/userlist" className="text-dark">
                  <i className="fas fa-users"> </i> Users
                </Nav.Link>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/admin/productlist" className="text-dark">
                  <i className="fas fa-store"> </i> Products
                </Nav.Link>
              </NavDropdown.Item>{" "}
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/admin/orderlist" className="text-dark">
                  <i className="fas fa-shopping-basket"> </i> Orders
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>


  );
};

export default Header;
