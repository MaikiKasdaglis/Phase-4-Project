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
import { useState } from "react";
export default function DogCard({ dog }) {
  //   console.log(`from dog card`, dog);
  const { dog_age, dog_breed, dog_name, id } = dog;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dogObj, setDogObj] = useState({
    dog_name: "",
    dog_breed: "",
    dog_age: 0,
  });

  const handleDelete = () => {
    fetch(`/api/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();

    handleClose();
    console.log("form submitting", dogObj);
    fetch(`/api/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogObj),
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
    <>
      <Card style={{ width: "100%", margin: "20px" }}>
        <Card.Body>
          <Card.Title>{dog_name}</Card.Title>
          <Card.Text>Age: {dog_age}</Card.Text>
          <Card.Text>Breed: {dog_breed}</Card.Text>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="secondary"
              onClick={handleShow}
              style={{ width: "100px" }}
            >
              Edit
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Dog</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleEdit}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Dog Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={dog_name}
                      value={dogObj.dog_name}
                      onChange={(e) =>
                        setDogObj({ ...dogObj, dog_name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Dog Breed</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={dog_breed}
                      value={dogObj.dog_breed}
                      onChange={(e) =>
                        setDogObj({ ...dogObj, dog_breed: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea2">
                    <Form.Label>Dog Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={dog_age}
                      value={dogObj.dog_age}
                      onChange={(e) =>
                        setDogObj({ ...dogObj, dog_age: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <div style={{ marginRight: "10px" }}></div>
            <Button
              variant="danger"
              onClick={() => handleDelete()}
              style={{ width: "100px" }}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
