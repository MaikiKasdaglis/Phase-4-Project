import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useState } from "react";

export default function CreatePhotoSession() {
  const [photoSession, setPhotoSession] = useState({
    session_price: 0,
    session_description: "",
    dog_id: "",
    set_id: "",
    photographer_id: "",
    session_date: "",
    session_request: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    console.log(photoSession);

    fetch("/api/photo_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photoSession),
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
                <Form.Label>session_price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter session_price"
                  value={photoSession.session_price}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      session_price: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="session_description">
                <Form.Label>session_description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter session_description"
                  value={photoSession.session_description}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      session_description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="dog_id">
                <Form.Label>dog_id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter dog_id"
                  value={photoSession.dog_id}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      dog_id: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="set_id">
                <Form.Label>set_id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter set_id"
                  value={photoSession.set_id}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      set_id: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="photographer_id">
                <Form.Label>photographer_id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter photographer_id"
                  value={photoSession.photographer_id}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      photographer_id: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="session_date">
                <Form.Label>session_date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter session_date"
                  value={photoSession.session_date}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      session_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="session_request">
                <Form.Label>session_request</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter session_request"
                  value={photoSession.session_request}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      session_request: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="m-1 ">
                Book Session!
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
