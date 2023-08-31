import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/userStore";
import Carousel from "react-bootstrap/Carousel";
function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { updateUser } = useUserStore();
  // const backgroundImageURL =
  //   "https://i.pinimg.com/564x/30/ec/f3/30ecf302ac72d8bda2631fd4104aeaa9.jpg";

  const handleLogin = (e) => {
    e.preventDefault();
    const userObj = {
      username,
      password,
    };
    console.log(userObj);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("this is what we talkin bout", data);
        updateUser(data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Carousel fade controls={false} indicators={false} interval={1000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://as2.ftcdn.net/v2/jpg/06/05/43/01/1000_F_605430104_9pZos4pteEyppZvPvjlZE2nzRtScU7A7.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/e3/47/d1/e347d1ef3e366de8afc43e82c7a677b1.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/3d/ab/ac/3dabac13fb458a831842d67c0864a1a6.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        {/* ... add more items if you have more images */}
      </Carousel>

      <Container
        style={{
          zIndex: 5,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div
              className="border p-4 rounded"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleLogin}
                  className="m-1 "
                >
                  Login
                </Button>
                <Link
                  style={{ marginLeft: "5px" }}
                  className="btn btn-secondary"
                  variant="secondary"
                  to="signup"
                  activeClassName="active"
                >
                  Signup
                </Link>
                {/* ========== HAVE SIGNUP FORM RENDER ON CLICK. ALSO HAVE OPPORTUNITY TO REGISTER A DOG UPON SIGNUP  */}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
