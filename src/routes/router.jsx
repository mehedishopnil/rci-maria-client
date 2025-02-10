import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Overview from "../pages/Overview/Overview";
import MyBookings from "../pages/MyBookings/MyBookings";
import SingleAvailableUnit from "../components/SingleResortPage/SingleAvailabelUnit/SingleAvailabelUnit";
import AvailableBooking from "../components/SingleResortPage/AvailableBooking/AvailableBooking";
import Search from "../components/Search/Search";
import ResortInputForm from "../components/ResortInputForm/ResortInputForm";
import Checkout from "../components/Checkout/Checkout";


export const router = createBrowserRouter([
     {
          path: "/",
          element: <Main/>,
          children: [
               {
                    path: "/",
                    element: <Home/>
               },
               {
                    path: "lastCallVacation",
                    element: <LastCallVacations/>
               },
               {
                    path: "singleResortPage/:id",
                    element: <SingleResortPage/>
               },
               {
                    path: "resortInputForm",
                    element: <ResortInputForm/>
               },
               {
                    path: "login",
                    element: <Login/>
               },
               {
                    path: "signup",
                    element: <SignUp/>
               },
               {
                    path: "search",
                    element: <Search/>
               },
               {
                    path: "single-available-unit",
                    element: <SingleAvailableUnit/>
               },
               {
                    path: "available-booking",
                    element: <AvailableBooking/>
               },
               {
                    path: "checkout",
                    element: <Checkout/>
               }
               
          ]
     },

     // Dashboard Part
     {
          path: "dashboard",
          element: <Dashboard/>,
          children: [
               {
                    path: "profile",
                    element: <Profile/>
               },
               {
                    path: "Overview",
                    element: <Overview/>
               },
               {
                    path: "MyBookings",
                    element: <MyBookings/>
               }
          ]
     }
])