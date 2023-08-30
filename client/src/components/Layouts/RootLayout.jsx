/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import BreadCrumbs from "../helperComponents/BreadCrumbs";
import useUserStore from "../../hooks/userStore";

export default function RootLayout() {
  const { user } = useUserStore();
  const navLinkText = user ? "Logout" : "Login";
  const navLinkTo = user ? "/logout" : "/login";
  // console.log("this is the user object", user);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Old Yellar's Pet Photography</Navbar.Brand>
          {/* <Navbar.Brand href="#home">Hello {user.username}</Navbar.Brand> */}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={navLinkTo} className="nav-link">
                {navLinkText}
              </NavLink>
              {user?.id ? (
                <NavLink to="home" className="nav-link">
                  Home
                </NavLink>
              ) : (
                ""
              )}
              {user?.id ? (
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <Link to="create_session" className="dropdown-item">
                    Create Session
                  </Link>
                  {user?.user_role === "pet_owner" ? (
                    <Link to="photographers" className="dropdown-item">
                      Meet Our Photographers
                    </Link>
                  ) : (
                    ""
                  )}

                  {user?.user_role === "pet_owner" ? (
                    <Link to="create_dog" className="dropdown-item">
                      Create Dog
                    </Link>
                  ) : (
                    ""
                  )}

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
              ) : (
                ""
              )}
            </Nav>
            {/* <h1>testing in</h1> */}
          </Navbar.Collapse>
          {user?.id ? <h6 className="nav-link">Hello! {user.username}</h6> : ""}
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
