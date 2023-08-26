import { useEffect } from "react";

export default function Home() {
  //========THIS IS THE CHECK SESSION. I DON'T KNOW WHY ITS HERE OR WHERE IT SHOULD GO
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>this is the home page</h1>
    </>
  );
}
