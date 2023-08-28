/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  const handleBackToLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const [signupObj, setSignupObj] = useState({
    username: "",
    email: "",
    _password_hash: "",
    user_role: "",
    user_image: "",
    user_bio: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div className="border p-4 rounded">
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
                  value={signupObj._password_hash}
                  onChange={(e) =>
                    setSignupObj({
                      ...signupObj,
                      _password_hash: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user role"
                  value={signupObj.user_role}
                  onChange={(e) =>
                    setSignupObj({ ...signupObj, user_role: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicUserImage">
                <Form.Label>User Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user image URL"
                  value={signupObj.user_image}
                  onChange={(e) =>
                    setSignupObj({ ...signupObj, user_image: e.target.value })
                  }
                />
              </Form.Group>
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
  );
}
