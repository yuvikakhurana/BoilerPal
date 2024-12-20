import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import Menu from "./screens/Menu.jsx";
import VerifyAccount from "./screens/VerifyAccount.jsx";
import FloorMap from "./screens/FloorMap.jsx";
import VendingMachine from "./screens/VendingMachine.jsx";
import ForgotPassword from "./screens/ForgotPassword.jsx";
import PasswordReset from "./screens/PasswordReset.jsx";
import Routing from "./screens/Routing.jsx";
import Calendar from "./screens/Calendar.jsx";
import Reservation from "./screens/reserve.jsx";
import GpaCalc from "./screens/gpaCalc.jsx";
import VendingInfo from "./screens/foodVending.jsx";
import RoutePlanner from "./screens/RoutePlan.jsx";

import Retail from "./screens/Retail.jsx";
import BusSchedules from "./screens/BusSchedules.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/verify/:id/:token" element={<VerifyAccount />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:id/:token" element={<PasswordReset />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Calendar />} />
        <Route path="/gpa-calc" element={<GpaCalc />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/building-info" element={<FloorMap />} />
        <Route path="/vending" element={<VendingMachine />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/routing" element={<Routing />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/foodVending" element={<VendingInfo />} />
        <Route path="/routeplan" element={<RoutePlanner />} />
        <Route path="/bustimes" element={<BusSchedules />} />
      </Route>
      <Route path="/retail" element={<Retail />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />;
    </React.StrictMode>
  </Provider>
);

