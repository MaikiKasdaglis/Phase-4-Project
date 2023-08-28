/* eslint-disable react/prop-types */
import { Button, Col, Card } from "react-bootstrap";

export default function ImageCard({ image }) {
  console.log("this is an image", image);
  return (
    <Col g-2 style={{ margin: 10 }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image.image_url} />
        <Card.Body>
          {/* <Card.Title>title</Card.Title> */}
          {/* <Card.Text>blah blah card text </Card.Text> */}
          {/* <Button variant="primary">View All Images</Button> */}
          <Button variant="primary">Love</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
