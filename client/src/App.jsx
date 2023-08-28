import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//=======COMPONENTS====================
// import Login from "../components/pages/Login";
import Home from "./components/home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

//========LAYOUTS======================
import RootLayout from "./components/Layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />}></Route>
      <Route path="home" element={<Home />} />
      <Route path="login/signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
