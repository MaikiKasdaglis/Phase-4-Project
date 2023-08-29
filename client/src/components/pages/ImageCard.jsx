/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Card } from "react-bootstrap";

export default function ImageCard({ image }) {
  const [likedByUser, setLikedByUser] = useState(image.image_liked_by_users);

  function handleUpdate() {
    const updatedImage = {
      ...image,
      image_liked_by_users: likedByUser === "no" ? "yes" : "no",
    };
    fetch(`/api/images/${image.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedImage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("this is form data", data);
        setLikedByUser(data.image_liked_by_users);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }

  return (
    <Col g-2 style={{ margin: 10 }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image.image_url} />
        <Card.Body>
          <Button variant="primary" onClick={handleUpdate}>
            {likedByUser === "yes" ? "Love It!" : "Hate It!"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
