import { Container, Row, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import useUserStore from "../../hooks/userStore";
import UploadWidgets from "../helperComponents/UploadWidgets";
import { useNavigate } from "react-router-dom";
import CreateImage from "./CreateImage";

export default function PhotoSet() {
  const navigate = useNavigate();
  //======USER OBJ FROM ZUSTAND AND ID FROM PARAMS =======
  const { user } = useUserStore();
  const { setId } = useParams();
  //==========FILTER STATE=============================
  const [filterStatus, setFilterStatus] = useState(false);

  //==========PHOTO SET OBJECTS (CURRENT AND PATCH STATE)=======
  const [photoSet, setPhotoSet] = useState([]);
  const [editSet, setEditSet] = useState({
    set_title: "",
    set_description: "",
  });

  //========IMAGE STUFF ==================
  const [image, setImage] = useState("");

  //=======MODAL STUFF =====================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //==============FETCH FOR PHOTOSET==========
  useEffect(() => {
    fetch(`/api//sets/${setId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotoSet(data);
      });
  }, [filterStatus]);

  //=============PATCH REQUEST================

  const handleEdit = (e) => {
    e.preventDefault();

    handleClose();

    fetch(`/api//sets/${setId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editSet),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

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
          <Button onClick={() => navigate("/home")}>Back To Home</Button>
          {user?.user_role === "photographer" ? (
            <>
              <Button variant="primary" onClick={handleShow}>
                Edit Set
              </Button>

              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Current Set</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleEdit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Set Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={photoSet.set_title}
                        value={editSet.set_title}
                        onChange={(e) =>
                          setEditSet({ ...editSet, set_title: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Set Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={photoSet.set_description}
                        value={editSet.set_description}
                        onChange={(e) =>
                          setEditSet({
                            ...editSet,
                            set_description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Form>
                  <CreateImage setId={setId} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            ""
          )}
          {/* {user?.user_role === "photographer" ? (
            <UploadWidgets setImage={setImage} />
          ) : (
            ""
          )} */}
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
