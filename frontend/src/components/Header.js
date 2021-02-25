import React from 'react'
import { Route } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';




const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch( logout() )
   
  }
  //C:\Users\Vasya\Desktop\trav_mern\frontend\public\favicon-32x32.png
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span>
                <Image
                  className="w-25"
                  src="/images/apple-touch-icon-removebg-preview.png"
                  alt="brilliant"
                />
              </span>{" "}
              <span id="logo">PRO-Shop</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({history}) => <SearchBox history={history} />}></Route>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
                )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header
