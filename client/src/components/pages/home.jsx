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
  // console.log("this is the user we fuckin with", user);
  // console.log("this is the ROLE we fuckin with", user.user_role);
  // console.log("this is the ID we fuckin with", user.id);

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

  const removePhotoSessionById = (idToDelete) => {
    const newData = photoSessionObj.filter((item) => item.id !== idToDelete);
    setPhotoSessionObj(newData);
  };

  if (user.user_role === "pet_owner") {
    const usersDogs = allDogs.filter((dog) => dog.dog_owner_id === user.id);
    displayOwnerSessions = photoSessionObj.filter((session) =>
      usersDogs.some((dog) => dog.id === session.dog_id)
    );
    // console.log(
    //   `this should be ${user.username}'s sessions relevant to dogs`,
    //   displayOwnerSessions
    // );
    // setDisplaySet(displayOwnerSessions);
  } else {
    displayOwnerSessions = photoSessionObj.filter(
      (session) => session.photographer_id === user.id
    );
    // console.log("yay", displayOwnerSessions);
    // setDisplaySet(displayOwnerSessions);
  }

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="m-3" g-2>
          {displayOwnerSessions.map((obj) => (
            <PhotoSessionCard
              key={obj.id}
              obj={obj}
              deleteSession={removePhotoSessionById}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}
