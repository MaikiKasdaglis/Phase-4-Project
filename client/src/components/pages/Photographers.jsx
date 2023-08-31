import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useUserStore from "../../hooks/userStore";
import PhotographerCard from "./PhotographerCard";

export default function Photographers() {
  //======================BACKGROUND STUFF=====================
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.2)), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4_yBNVbYuRP0dC5WYt68fVFsG-67s3P4qpw&usqp=CAU)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "20px",
    backgroundSize: "cover",
  };
  //==========================================================
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersList(data);
      });
  }, []);
  //   console.log(`this is all our users`, usersList);
  const photographerList = usersList.filter(
    (user) => user.user_role === "photographer"
  );
  //   console.log(`this is all the photographers. `, photographerList);
  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="m-3" g-2>
          {photographerList.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              photographer={photographer}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}
