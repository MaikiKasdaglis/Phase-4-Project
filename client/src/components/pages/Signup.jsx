/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UploadWidgets from "../helperComponents/UploadWidgets";
import useUserStore from "../../hooks/userStore";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/home");
  };
  const { updateUser } = useUserStore();

  const handleBackToLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const [signupObj, setSignupObj] = useState({
    username: "",
    email: "",
    _password_hash: "",
    user_role: "",
    user_bio: "",
  });

  const [image, setImage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const signObj = {
      ...signupObj,
      user_image: image,
    };

    console.log(signObj);

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        handleBackToHome();
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Carousel fade controls={false} indicators={false} interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/5e/bb/62/5ebb62c6addf790cc999d64d287ad937.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/17/11/82/171182e69b88a2b4e69c498bd8616446.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/82/de/3e/82de3e69a4e6a8be1eadbc3d1301c2ed.jpg"
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
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={signupObj.username}
                    onChange={(e) =>
                      setSignupObj({ ...signupObj, username: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={signupObj.email}
                    onChange={(e) =>
                      setSignupObj({ ...signupObj, email: e.target.value })
                    }
                  />
                </Form.Group>
                {/* THIS FORM IS MOSTLY WORKING BUT PASSWORD IS NOT BEING HASHED. MAYBE REMOVE _?? */}
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={signupObj.password_hash}
                    onChange={(e) =>
                      setSignupObj({
                        ...signupObj,
                        _password_hash: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicUserRole"
                  style={{ marginBottom: "10px" }}
                >
                  <Form.Label>User Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={signupObj.user_role}
                    onChange={(e) =>
                      setSignupObj({ ...signupObj, user_role: e.target.value })
                    }
                  >
                    <option value="">Select user role</option>
                    <option value="photographer">Photographer</option>
                    <option value="pet_owner">Client</option>
                  </Form.Control>
                </Form.Group>
                {signupObj.user_role === "photographer" && (
                  <Form.Group controlId="formBasicUserImage">
                    <Form.Label>User Image</Form.Label>
                    <UploadWidgets setImage={setImage} />
                  </Form.Group>
                )}
                {signupObj.user_role === "photographer" && (
                  <Form.Group controlId="formBasicUserBio">
                    <Form.Label>User Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter user bio"
                      value={signupObj.user_bio}
                      onChange={(e) =>
                        setSignupObj({ ...signupObj, user_bio: e.target.value })
                      }
                    />
                  </Form.Group>
                )}
                <Button variant="primary" type="submit" className="m-1 ">
                  Sign Up
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="secondary"
                  onClick={handleBackToLogin}
                >
                  Back To Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
