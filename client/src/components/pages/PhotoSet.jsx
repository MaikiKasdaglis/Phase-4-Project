import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

export default function PhotoSet() {
  const { setId } = useParams();
  const [filterStatus, setFilterStatus] = useState(false);
  const [photoSet, setPhotoSet] = useState([]);
  useEffect(() => {
    fetch(`/api//sets/${setId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotoSet(data);
      });
  }, [filterStatus]);

  console.log(photoSet);

  return (
    <>
      <Container>
        <div
          className="sticky-top bg-light p-3 d-flex justify-content-between align-items-center"
          style={{ zIndex: "999" }}
        >
          <div className="d-flex flex-column">
            <h2>{photoSet.set_title}</h2>
            <p>{photoSet.set_description}</p>
          </div>
          <Button
            variant="primary"
            onClick={(e) => {
              setFilterStatus(!filterStatus), console.log(filterStatus);
            }}
          >
            {filterStatus ? "Show Loved Images" : "Show all Images"}
          </Button>
        </div>
        <Row className="m-3" g-2>
          {photoSet.image_field
            ?.filter((image) =>
              filterStatus ? image.image_liked_by_users === "yes" : image
            )
            ?.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
        </Row>
      </Container>
    </>
  );
}
