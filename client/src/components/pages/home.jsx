import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PhotoSessionCard from "./PhotoSessionCard";

export default function Home() {
  //========THIS IS THE CHECK SESSION. I DON'T KNOW WHY ITS HERE OR WHERE IT SHOULD GO
  // useEffect(() => {
  //   fetch("/api/check_session")
  //     .then((response) => response.json())
  //     .then((data) => console.log("this is whos logged in", data));
  // }, []);

  const [photoSessionObj, setPhotoSessionObj] = useState([]);
  useEffect(() => {
    fetch("/api/photo_sessions")
      .then((response) => response.json())
      .then((data) => {
        setPhotoSessionObj(data);
      });
  }, []);
  console.log(photoSessionObj);
  return (
    <>
      <Container>
        <Row className="m-3" g-2>
          {photoSessionObj.map((obj) => (
            <PhotoSessionCard key={obj.id} obj={obj} />
          ))}
        </Row>
      </Container>
    </>
  );
}
