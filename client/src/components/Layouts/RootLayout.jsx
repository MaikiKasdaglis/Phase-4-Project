/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

// import BreadCrumbs from "../helperComponents/BreadCrumbs";
import useUserStore from "../../hooks/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  let location = useLocation();
  console.log(`this is params`, location.pathname);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, deleteUser } = useUserStore();
  const navLinkText = user ? "Logout" : "Login";
  const navLinkTo = user ? "/logout" : "/login";
  const navigate = useNavigate();
  // console.log("this is the user object", user);

  const handleDelete = () => {
    handleClose();
    fetch(`/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        deleteUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img
            src="./Old_Yeller_Logo_White-02.png"
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            Old Yellar's Pet Photography
          </Navbar.Brand>
          {/* <Navbar.Brand href="#home">Hello {user.username}</Navbar.Brand> */}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <NavLink to={navLinkTo} className="nav-link">
                {navLinkText}
              </NavLink> */}
              {user?.id ? (
                <NavLink
                  to="home"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  Home
                </NavLink>
              ) : (
                ""
              )}
              {user?.id ? (
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  {/* <Link to="create_session" className="dropdown-item">
                    Create Session
                  </Link> */}
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
                  {user?.user_role === "pet_owner" ? (
                    <>
                      {" "}
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Contact Us!
                      </NavDropdown.Item>
                    </>
                  ) : (
                    ""
                  )}
                  {user?.user_role === "photographer" ? (
                    <Link to="" className="dropdown-item">
                      Ask me about useLocation
                    </Link>
                  ) : (
                    ""
                  )}
                  {user?.user_role === "photographer" ? (
                    <Link to="home" className="dropdown-item">
                      Photographer Stuff
                    </Link>
                  ) : (
                    ""
                  )}
                  {user?.user_role === "photographer" ? (
                    <>
                      {" "}
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Check Messages
                      </NavDropdown.Item>
                    </>
                  ) : (
                    ""
                  )}

                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Contact Us!
                  </NavDropdown.Item> */}
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
            {/* <h1>testing in</h1> */}
          </Navbar.Collapse>
          {/* {user?.id ? <h6 className="nav-link">Hello! {user.username}</h6> : ""} */}
          <NavDropdown
            title={user?.id ? user?.username : "Login/Signup"}
            id="basic-nav-dropdown"
          >
            <Link to={navLinkTo} className="dropdown-item">
              {navLinkText}
            </Link>
            {user?.id ? (
              <NavLink to="edit_profile" className="dropdown-item">
                Edit Profile
              </NavLink>
            ) : (
              // <NavDropdown.Item href="#action/3.4">
              //   Edit Profile
              // </NavDropdown.Item>
              ""
            )}
            {user?.id ? (
              <>
                <Button
                  style={{ color: "white" }}
                  className="dropdown-item"
                  onClick={handleShow}
                >
                  Delete Profile
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>You sure, bro?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>really..., you're not fucking around?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Nah, turn back
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : (
              // <NavDropdown.Item href="#action/3.4">
              //   Delete Profile
              // </NavDropdown.Item>

              ""
            )}
          </NavDropdown>
          {/* <h1>testing out </h1> */}
        </Container>
        {/* <h1>testin out container</h1> */}
      </Navbar>
      {location.pathname === "/" ? (
        <div>
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center">
                <img
                  src="./Old_Yeller_Logo_Black-01.png"
                  alt=""
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
