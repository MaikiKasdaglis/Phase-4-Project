/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import BreadCrumbs from "../helperComponents/BreadCrumbs";

export default function RootLayout() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Old Yellar's Pet Photography</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              <NavLink to="login" className="nav-link">
                Login
              </NavLink>
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              <NavLink to="home" className="nav-link">
                Home
              </NavLink>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Link to="create_session" className="dropdown-item">
                  Create Session
                </Link>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <h1>testing in</h1> */}
          </Navbar.Collapse>
          {/* <h1>testing out </h1> */}
        </Container>
        {/* <h1>testin out container</h1> */}
      </Navbar>
      {/* <BreadCrumbs /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
