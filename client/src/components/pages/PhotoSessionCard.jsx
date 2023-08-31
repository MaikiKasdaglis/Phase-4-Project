/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export default function PhotoSessionCard({ obj }) {
  const cld = new Cloudinary({ cloud: { cloudName: "dug4rmcqv" } });
  const handleDelete = () => {
    fetch(`/api/photo_sessions/${obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    fetch(`/api/photo_set/${obj.set_field.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  };
  const firsImage = obj.set_field.image_field[0]?.image_url;
  return (
    <Col g-2 style={{ margin: "10px 0" }}>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src={firsImage} /> */}

        {firsImage.includes(".") ? (
          <Card.Img variant="top" src={firsImage} />
        ) : (
          <AdvancedImage
            cldImg={cld.image(firsImage)}
            height="285"
            // className="img-fluid"
            key={firsImage}
          />
        )}

        <Card.Body style={{ height: "200px" }}>
          <Card.Title>Dog Name: {obj.dog_field.dog_name}</Card.Title>

          <Card.Text style={{ height: "80px", overflow: "auto" }}>
            Session Details:
            {obj["session_description"]}
          </Card.Text>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              className="btn btn-primary"
              variant="primary"
              to={`photo_set/${obj.set_field.id}`}
              activeClassName="active"
              style={{ width: "100%", marginRight: "10px" }}
            >
              View All
            </Link>
            <Button
              variant="danger"
              onClick={() => handleDelete()}
              style={{ width: "100%" }}
            >
              Delete
            </Button>
            {/* ===============NEED CASCADING DELETE TO GET TO SET AND ALL IMAGES */}
            {/* WITH THAT SET I */}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
