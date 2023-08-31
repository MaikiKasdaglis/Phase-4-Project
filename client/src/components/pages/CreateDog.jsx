import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import useUserStore from "../../hooks/userStore";
import DogCard from "./DogCard";

export default function CreateDog() {
  //======================BACKGROUND STUFF=====================
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.2)), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_yBNVbYuRP0dC5WYt68fVFsG-67s3P4qpw&usqp=CAU)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "20px",
    backgroundSize: "cover",
  };
  //==========================================================

  const { user } = useUserStore();
  const [userDogs, setUserDogs] = useState([]);
  const [dogObj, setDogObj] = useState({
    dog_name: "",
    dog_breed: "",
    dog_age: 0,
    dog_owner_id: user.id,
  });
  const handleCreateDog = (e) => {
    e.preventDefault();
    console.log(`this is the object from createDogForm`, dogObj);
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

        // Add the new dog to the userDogs array
        setUserDogs([...userDogs, data]);

        // Reset the dogObj state to clear the input fields
        setDogObj({
          dog_name: "",
          dog_breed: "",
          dog_age: 0,
          dog_owner_id: user.id,
        });
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  useEffect(() => {
    fetch(`/api/dogs`)
      .then((response) => response.json())
      .then((data) => {
        setUserDogs(data);
      });
  }, [dogObj, userDogs]);
  const dogList = userDogs.filter((dog) => dog.dog_owner_id === user.id);
  console.log(`${user.username} owns`, dogList);

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <h5 style={{ color: "white" }}>Your Current Dogs</h5>
          </Col>
          {dogList.map((dog) => (
            <Col xs={12} md={4} className="mb-3" key={dog.id}>
              <DogCard dog={dog} />
            </Col>
          ))}
        </Row>

        <Row>
          <Col xs={12}>
            <div
              className="border p-4 rounded"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                width: "100%",
              }}
            >
              <Form onSubmit={handleCreateDog}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Dog Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What do you call your dog?"
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
                    placeholder="What breed is your dog?"
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
                    placeholder="How old is your dog?"
                    value={dogObj.dog_age}
                    onChange={(e) =>
                      setDogObj({ ...dogObj, dog_age: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-1">
                  Register Dog!
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
