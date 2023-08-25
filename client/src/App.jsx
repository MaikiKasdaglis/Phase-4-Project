import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login";

function App() {
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

export default App;
