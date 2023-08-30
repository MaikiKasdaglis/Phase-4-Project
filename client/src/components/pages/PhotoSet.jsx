import { Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import useUserStore from "../../hooks/userStore";
import UploadWidgets from "../helperComponents/UploadWidgets";

export default function PhotoSet() {
  const { user } = useUserStore();
  const { setId } = useParams();
  const [filterStatus, setFilterStatus] = useState(false);
  const [photoSet, setPhotoSet] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(`/api//sets/${setId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotoSet(data);
      });
  }, [filterStatus]);

  console.log("this is a set", photoSet);

  return (
    <>
      <Container>
        <div
          className="sticky-top bg-light p-3 d-flex justify-content-between align-items-center"
          style={{ zIndex: "999" }}
        >
          <div className="d-flex flex-column">
            <h2>Title: {photoSet.set_title}</h2>
            <p>Description: {photoSet.set_description}</p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setFilterStatus(!filterStatus);
            }}
          >
            {filterStatus ? "Show Loved Images" : "Show all Images"}
          </Button>
          {user?.user_role === "photographer" ? (
            <Button onClick={() => console.log("clickin")}>Edit Session</Button>
          ) : (
            ""
          )}
          {user?.user_role === "photographer" ? (
            <UploadWidgets setImage={setImage} />
          ) : (
            ""
          )}
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
