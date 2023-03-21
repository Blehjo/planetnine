import { Dashboard } from "./components/Dashboard";
import { Authentication } from "./components/Authentication";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/authentication',
    element: <Authentication />
  }
];

export default AppRoutes;
