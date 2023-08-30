import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import useUserStore from "../../hooks/userStore";
import DogCard from "./DogCard";

export default function CreateDog() {
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
  }, []);
  const dogList = userDogs.filter((dog) => dog.dog_owner_id === user.id);
  console.log(`${user.username} owns`, dogList);

  return (
    <Container>
      <Row className="mt-4">
        <Col g-2 style={{ margin: "10px 0" }}>
          <h5 style={{ marginLeft: "20px " }}>Your Current Dogs</h5>
          {dogList.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </Col>

        <Col>
          <div className="border p-4 rounded" style={{ marginRight: "20px" }}>
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
  );
}
