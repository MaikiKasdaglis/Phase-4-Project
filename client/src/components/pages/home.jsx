import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PhotoSessionCard from "./PhotoSessionCard";
import useUserStore from "../../hooks/userStore";

export default function Home() {
  const { user } = useUserStore();
  const [allDogs, setAllDogs] = useState([]);
  let displayOwnerSessions;
  // const [displaySet, setDisplaySet] = useState([]);
  console.log("this is the user we fuckin with", user);
  console.log("this is the ROLE we fuckin with", user.user_role);
  console.log("this is the ID we fuckin with", user.id);

  const [photoSessionObj, setPhotoSessionObj] = useState([]);
  useEffect(() => {
    fetch("/api/photo_sessions")
      .then((response) => response.json())
      .then((data) => {
        setPhotoSessionObj(data);
      });
    fetch("/api/dogs")
      .then((response) => response.json())
      .then((D) => setAllDogs(D));
  }, []);

  if (user.user_role === "pet_owner") {
    const usersDogs = allDogs.filter((dog) => dog.dog_owner_id === user.id);
    displayOwnerSessions = photoSessionObj.filter((session) =>
      usersDogs.some((dog) => dog.id === session.dog_id)
    );
    console.log(
      `this should be ${user.username}'s sessions relevant to dogs`,
      displayOwnerSessions
    );
    // setDisplaySet(displayOwnerSessions);
  } else {
    displayOwnerSessions = photoSessionObj.filter(
      (session) => session.photographer_id === user.id
    );
    console.log("yay", displayOwnerSessions);
    // setDisplaySet(displayOwnerSessions);
  }

  return (
    <>
      <Container>
        <Row className="m-3" g-2>
          {displayOwnerSessions.map((obj) => (
            <PhotoSessionCard key={obj.id} obj={obj} />
          ))}
        </Row>
      </Container>
    </>
  );
}
