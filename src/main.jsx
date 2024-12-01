import ReactDOM from "react-dom/client";
import Layout from "./layout/Layout";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
    },
    {
      path: "login",
      element: (
        <PublicRoute>
          <LogIn />
        </PublicRoute>
      ),
    },
    {
      path: "register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
