/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

export default function PhotoSessionCard({ obj }) {
  console.log("this is the object i'm passing to each card", obj);
  return (
    <Col g-2>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={obj.set_field.image_field[0].image_url} />
        <Card.Body>
          <Card.Title>{obj.dog_field.dog_name}</Card.Title>

          <Card.Text>{obj["session_description"]}</Card.Text>
          {/* <Button variant="primary">View All Images</Button> */}
          <Link
            className="btn btn-primary"
            variant="primary"
            to={`photo_set/${obj.set_field.id}`}
            activeClassName="active"
            onClick={() =>
              console.log("this is the set i'm clicking on", obj.set_field.id)
            }
          >
            View All Images
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
