/* eslint-disable react/jsx-key */
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/userStore";
import { useEffect, useState } from "react";

export default function CreatePhotoSession() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [userDogs, setUserDogs] = useState([]);
  console.log("this is the user from createPhotoSession", user);

  useEffect(() => {
    fetch(`/api/dogs`)
      .then((response) => response.json())
      .then((data) => {
        setUserDogs(data);
      });
  }, []);
  const dogList = userDogs.filter((dog) => dog.dog_owner_id === user.id);
  console.log(`${user.username} owns`, dogList);
  const [photoSession, setPhotoSession] = useState({
    session_price: 0,
    session_description: "",
    dog_id: "",
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
    <Container fluid >
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
                <Form.Label>Dog Name</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter dog_id"
                  value={photoSession.dog_id}
                  onChange={(e) =>
                    setPhotoSession({
                      ...photoSession,
                      dog_id: e.target.value,
                    })
                  }
                /> */}
                <Form.Control
                  as="select"
                  // value={signupObj.user_role}
                  onChange={(e) =>
                    setPhotoSession({ ...photoSession, dog_id: e.target.value })
                  }
                >
                  <option value="">Select Dog</option>
                  {dogList.map((dog) => (
                    <option value={dog.id}>{dog.dog_name}</option>
                  ))}
                  {/* <option value="photographer">Photographer</option>
                <option value="pet_owner">Client</option> */}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="set_id">
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
              </Form.Group> */}
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
              <Button
                style={{ marginLeft: "5px" }}
                variant="secondary"
                onClick={(e) => navigate("/photographers")}
              >
                Back To Photographers
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
