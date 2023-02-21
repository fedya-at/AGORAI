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
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand rand='true' href='/' className='text-light'>
            {' '} AIvana          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/profile' className='text-dark'>
                      <i className='fa fa-user'> </i> Profile
                    </Nav.Link>
                  </NavDropdown.Item>{' '}
                  <NavDropdown.Item onClick={logoutHandler} className='text-dark'>
                    <i className='fa fa-sign-out'> </i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user'> </i> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Panel' id='adminmenu'>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/userlist' className='text-dark'>
                      <i className='fas fa-users'> </i> Users
                    </Nav.Link>
                  </NavDropdown.Item>{' '}
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/productlist' className='text-dark'>
                      <i className='fas fa-store'> </i> Products
                    </Nav.Link>
                  </NavDropdown.Item>{' '}
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/admin/orderlist' className='text-dark'>
                      <i className='fas fa-shopping-basket'> </i> Orders
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
