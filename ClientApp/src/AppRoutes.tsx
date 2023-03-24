import Authentication from "./Routes/Authentication/Authentication.component";
import { Dashboard } from "./Routes/Dashboard/Dashboard.component";
import { Home } from "./Routes/Home/Home.component";

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
