import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import useUserStore from "../../hooks/userStore";

export default function CreateDog() {
  const { user } = useUserStore();
  const [dogObj, setDogObj] = useState({
    dog_name: "",
    dog_breed: "",
    dog_age: 0,
    dog_owner_id: user.id,
  });
  const handleCreateDog = (e) => {
    e.preventDefault();
    console.log(dogObj);
    fetch("/api/dogs", {
      method: "POST",
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
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div className="border p-4 rounded">
            <Form onSubmit={handleCreateDog}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Dog Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What do you call your dog?"
                  value={dogObj.dog_name}
                  onChange={(e) =>
                    setDogObj({
                      ...dogObj,
                      dog_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Dog Breed</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What breed is your dog?"
                  value={dogObj.dog_breed}
                  onChange={(e) =>
                    setDogObj({
                      ...dogObj,
                      dog_breed: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Dog Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="How old is your dog?"
                  value={dogObj.dog_age}
                  onChange={(e) =>
                    setDogObj({
                      ...dogObj,
                      dog_age: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="m-1 ">
                Register Dog!
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}