/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Modal,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import useUserStore from "../../hooks/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//============TOP OF THE FUNCTION===============================
export default function PhotographerCard({ photographer }) {
  const cld = new Cloudinary({ cloud: { cloudName: "dug4rmcqv" } });
  //user stuff ===========================
  const { user } = useUserStore();
  const [userDogs, setUserDogs] = useState([]);
  //photographer stuff ========================
  const { email, id, user_bio, user_image, user_role, username } = photographer;
  //modal stuff =================================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //navigate===================================
  const navigate = useNavigate();

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
    session_description: "",
    session_price: 0,
    dog_id: "",
    photographer_id: id,
    session_date: "",
    session_request: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    console.log(`we're submitting`, photoSession);

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
    <Col g-2 style={{ margin: "10px 0" }}>
      <Card style={{ width: "18rem" }}>
        {user_image.includes(".") ? (
          <Card.Img variant="top" src={user_image} />
        ) : (
          <AdvancedImage
            cldImg={cld.image(user_image)}
            height="285"
            // className="img-fluid"
            key={user.user_image}
          />
        )}

        <Card.Body style={{ height: "200px" }}>
          <Card.Title>{username}</Card.Title>
          <Card.Text style={{ height: "80px", overflow: "auto" }}>
            {user_bio}
          </Card.Text>

          <Button variant="primary" onClick={handleShow}>
            Book Session
          </Button>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
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

                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setPhotoSession({
                        ...photoSession,
                        dog_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Dog</option>
                    {dogList.map((dog) => (
                      <option value={dog.id}>{dog.dog_name}</option>
                    ))}
                  </Form.Control>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Col>
  );
}
