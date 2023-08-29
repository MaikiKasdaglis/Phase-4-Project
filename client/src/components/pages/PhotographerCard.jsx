/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import useUserStore from "../../hooks/userStore";
import Col from "react-bootstrap/Col";

export default function PhotographerCard({ photographer }) {
  // console.log(`this is from the photographerCard`, photographer);

  const cld = new Cloudinary({ cloud: { cloudName: "dug4rmcqv" } });
  const { user } = useUserStore();
  const { email, id, user_bio, user_image, user_role, username } = photographer;
  console.log(username);

  return (
    <Col g-2 style={{ margin: "10px 0" }}>
      <Card style={{ width: "18rem" }}>
        {user_image.includes(".") ? (
          <Card.Img variant="top" src={user_image} />
        ) : (
          <AdvancedImage
            cldImg={cld.image(user_image)}
            // aspectRatio="1:1"
            height="285"
            key={user.user_image}
          />
        )}

        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Text>{user_bio}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
