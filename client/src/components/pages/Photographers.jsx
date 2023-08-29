import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useUserStore from "../../hooks/userStore";
import PhotographerCard from "./PhotographerCard";

export default function Photographers() {
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
    <>
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
    </>
  );
}
