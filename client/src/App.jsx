import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";

//=======COMPONENTS====================
import Home from "./components/pages/home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PhotoSet from "./components/pages/PhotoSet";

//========LAYOUTS======================
import RootLayout from "./components/Layouts/RootLayout";
import CreatePhotoSession from "./components/pages/CreatePhotoSession";

import useUserStore from "./hooks/userStore";

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
  const { user, updateUser } = useUserStore();
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        updateUser(data);
        console.log("this is whos logged in", data);
        // console.log(user);
      });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
