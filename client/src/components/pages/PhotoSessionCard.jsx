/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

export default function PhotoSessionCard({ obj }) {
  return (
    <Col g-2 style={{ margin: "10px 0" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={obj.set_field.image_field[0]?.image_url} />
        <Card.Body style={{ height: "200px" }}>
          <Card.Title>Dog Name: {obj.dog_field.dog_name}</Card.Title>

          <Card.Text style={{ height: "80px", overflow: "auto" }}>
            Session Details:
            {obj["session_description"]}
          </Card.Text>

          <Link
            className="btn btn-primary"
            variant="primary"
            to={`photo_set/${obj.set_field.id}`}
            activeClassName="active"
          >
            View All Images
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
