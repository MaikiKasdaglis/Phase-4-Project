import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PhotoSessionCard from "./PhotoSessionCard";
import useUserStore from "../../hooks/userStore";

export default function Home() {
  const { user } = useUserStore();
  const [allDogs, setAllDogs] = useState([]);
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

  const usersDogs = allDogs.filter((dog) => dog.dog_owner_id === user.id);
  console.log(`these are the dogs ${user.username} owns:`, usersDogs);
  console.log(
    `this is all the photosessions we need to filter?`,
    photoSessionObj
  );
  //this shit works for a sec, then breaks on refresh. some sync shit prob?
  console.log(`testing drilling`, photoSessionObj[0]?.id);

  const displayOwnerSessions = photoSessionObj.filter((session) =>
    usersDogs.some((dog) => dog.id === session.dog_id)
  );
  console.log(
    `this should be ${user.username}'s sessions relevant to dogs`,
    displayOwnerSessions
  );
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
