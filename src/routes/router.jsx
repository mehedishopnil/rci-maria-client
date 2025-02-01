import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";


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
                    path: "singleResortPage",
                    element: <SingleResortPage/>
               }
          ]
     }
])