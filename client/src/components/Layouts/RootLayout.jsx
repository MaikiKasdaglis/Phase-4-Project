/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
              <NavLink to="login" className="nav-link" activeClassName="active">
                Login
              </NavLink>
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              <NavLink to="home" className="nav-link" activeClassName="active">
                Home
              </NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// return (
//   <div className="root-layout">
//     <header>
//       <nav>
//         <h1>company name</h1>
//         <NavLink to="/">this is whats rendering </NavLink>
//       </nav>
//     </header>

//     <main>
//       <Outlet />
//     </main>
//   </div>
// );
// }
