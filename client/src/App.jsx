import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//=======COMPONENTS====================
import Home from "./components/pages/home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PhotoSet from "./components/pages/PhotoSet";

//========LAYOUTS======================
import RootLayout from "./components/Layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />}></Route>
      <Route path="home" element={<Home />} />
      <Route path="home/photo_set/:setId" element={<PhotoSet />} />
      <Route path="login/signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
