/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Card } from "react-bootstrap";
import useUserStore from "../../hooks/userStore";

export default function ImageCard({ image }) {
  const [likedByUser, setLikedByUser] = useState(image.image_liked_by_users);
  const { user } = useUserStore();

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
  const handleDelete = () => {
    fetch(`/api/images/${image.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  };

  return (
    <Col style={{ margin: 10 }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image.image_url} />
        <Card.Body className="d-flex justify-content-between">
          <Button
            variant={likedByUser === "yes" ? "primary" : "secondary"}
            onClick={handleUpdate}
            style={{ marginRight: "10px" }}
          >
            {likedByUser === "yes" ? "Love It!" : "Hate It!"}
          </Button>
          {user.user_role === "photographer" ? (
            <Button variant="danger" onClick={() => handleDelete()}>
              Delete
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
