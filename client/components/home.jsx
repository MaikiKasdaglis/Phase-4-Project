import { useEffect } from "react";
import Login from "./pages/Login";

export default function Home() {
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
