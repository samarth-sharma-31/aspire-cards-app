import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardsPage from "./components/pages/Cards";
import CreditPage from "./components/pages/Credit";
import ErrorPage from "./components/pages/Error";
import HomePage from "./components/pages/Home";
import PaymentsPage from "./components/pages/Payments";
import SettingsPage from "./components/pages/Settings";
import Root from "./components/Root";
import "./styles.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // Have added support to display error page if user lands on unsupported route.
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/cards",
        element: <CardsPage />,
      },
      {
        path: "/payments",
        element: <PaymentsPage />,
      },
      {
        path: "/credit",
        element: <CreditPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);


export default function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}
