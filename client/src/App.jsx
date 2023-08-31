import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "./hooks/userStore";

//=======COMPONENTS====================
import Home from "./components/pages/home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PhotoSet from "./components/pages/PhotoSet";
import Logout from "./components/pages/Logout";
import CreateDog from "./components/pages/CreateDog";
import PhotographerCard from "./components/pages/PhotographerCard";
import Photographers from "./components/pages/Photographers";
import EditProfile from "./components/pages/EditProfile";

//========LAYOUTS======================
import RootLayout from "./components/Layouts/RootLayout";
import CreatePhotoSession from "./components/pages/CreatePhotoSession";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="home/photo_set/:setId" element={<PhotoSet />} />
      <Route path="login/signup" element={<Signup />} />
      <Route
        path="photographers/create_session"
        element={<CreatePhotoSession />}
      />
      <Route path="logout" element={<Logout />} />
      <Route path="create_dog" element={<CreateDog />} />
      <Route path="photographer_card" element={<PhotographerCard />} />
      <Route path="photographers" element={<Photographers />} />
      <Route path="edit_profile" element={<EditProfile />} />
    </Route>
  )
);

function App() {
  const { updateUser } = useUserStore();
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.username);
        data.username != undefined ? updateUser(data) : null;
        console.log("this is whos logged in", data);
        // console.log(user);
      });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
