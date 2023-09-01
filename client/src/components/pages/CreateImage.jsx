import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UploadWidgets from "../helperComponents/UploadWidgets";
import useUserStore from "../../hooks/userStore";
export default function CreateImage({ setId }) {
  const { updateUser } = useUserStore();
  const [imageObj, setImageObj] = useState({
    set_id: setId,
    image_liked_by_users: "no",
    image_url: "",
  });

  const [image, setImage] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    const finalObj = {
      ...imageObj,
      image_url: image,
    };
    // const finalObj = {
    //   set_id: setId,
    //   image_liked_by_users: "no",
    //   image_url: image,
    // };

    // console.log(finalObj);

    fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalObj),
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
      <Form onSubmit={handleCreate}>
        <div
          className="mt-2 "
          style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
        >
          <Form.Group controlId="formBasicUserImage">
            <UploadWidgets setImage={setImage} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Image
          </Button>
        </div>
      </Form>
    </>
  );
}
