import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

//=======COMPONENTS====================
import Home from "./components/pages/home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PhotoSet from "./components/pages/PhotoSet";

//========LAYOUTS======================
import RootLayout from "./components/Layouts/RootLayout";
import CreatePhotoSession from "./components/pages/CreatePhotoSession";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />}></Route>
      <Route path="home" element={<Home />} />
      <Route path="home/photo_set/:setId" element={<PhotoSet />} />
      <Route path="login/signup" element={<Signup />} />
      <Route path="create_session" element={<CreatePhotoSession />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        console.log("this is whos logged in", data);
      });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
