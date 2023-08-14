import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddClient from "./components/AddClient";
import GetClient from "./components/GetClient";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register-client",
      element: <AddClient />,
    },
    {
      path: "/get-client",
      element: <GetClient />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
