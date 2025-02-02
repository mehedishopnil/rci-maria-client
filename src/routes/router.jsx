import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";


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
                    path: "login",
                    element: <Login/>
               },
               {
                    path: "signup",
                    element: <SignUp/>
               },
               
          ]
     }
])