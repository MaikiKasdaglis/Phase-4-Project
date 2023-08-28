/* eslint-disable react/prop-types */
import { Button, Col, Card } from "react-bootstrap";

export default function ImageCard({ image }) {
  return (
    <Col g-2 style={{ margin: 10 }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image.image_url} />
        <Card.Body>
          <Button variant="primary" onClick={(e) => console.log(image.id)}>
            Love
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
