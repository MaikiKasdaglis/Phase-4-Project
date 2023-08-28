import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

export default function PhotoSet() {
  const { setId } = useParams();
  console.log("logging from useParams()", useParams());
  console.log("this is setId that i'm setting", setId.setId);

  const [photoSet, setPhotoSet] = useState([]);
  useEffect(() => {
    fetch(`/api//sets/${setId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotoSet(data);
        console.log("this should be a photoset", data);
      });
  }, []);

  console.log(photoSet);
  return (
    <>
      <Container>
        <Row className="m-3" g-2>
          {photoSet.image_field?.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </Row>
      </Container>
    </>
  );
}
