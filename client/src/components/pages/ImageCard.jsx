/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Card } from "react-bootstrap";
import useUserStore from "../../hooks/userStore";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function ImageCard({ image }) {
  const cld = new Cloudinary({ cloud: { cloudName: "dug4rmcqv" } });
  const [likedByUser, setLikedByUser] = useState(image.image_liked_by_users);
  const { user } = useUserStore();
  console.log(`this is from image card`, image);
  const { id, image_liked_by_users, image_url, set_id } = image;

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
      <Card
        style={{
          width: "18rem",
          background: "linear-gradient(blue, darkblue, grey)",
        }}
      >
        {/* <Card.Img variant="top" src={image.image_url} /> */}
        {image_url.includes(".") ? (
          <Card.Img variant="top" src={image_url} />
        ) : (
          <AdvancedImage
            cldImg={cld.image(image_url)}
            height="285"
            key={image_url}
          />
        )}

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
