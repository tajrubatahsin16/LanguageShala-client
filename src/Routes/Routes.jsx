import {
  createBrowserRouter,
} from "react-router-dom";
import Main from '../Layout/Main.jsx';
import Home from "../Components/Home/Home.jsx";
import Login from "../Components/Login/Login.jsx";
import Register from "../Components/Register/Register.jsx";
import NotFoundLayout from "../Layout/NotFoundLayout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "../Layout/Dashboard.jsx";
import AdminRoute from "./AdminRoute.jsx";
import SelectedClasses from "../Components/Dashboard/selectedClasses/selectedClasses.jsx";
import ManageClasses from "../Components/Dashboard/manageClasses/manageClasses.jsx";
import ManageUsers from "../Components/Dashboard/ManageUsers/ManageUsers.jsx";
import InstructorRoute from "./InstructorRoute.jsx";
import AddClass from "../Components/Dashboard/AddClass/AddClass.jsx";
import MyClasses from "../Components/Dashboard/MyClasses/MyClasses.jsx";
import UpdateClasses from "../Components/Dashboard/MyClasses/UpdateClasses.jsx";
import FeedbackClass from "../Components/Dashboard/ManageClasses/FeedbackClass.jsx";
import Instructors from "../Components/Instructors/Instructors.jsx";
import Classes from "../Components/Classes/Classes.jsx";
import SelectProcess from "../Components/SelectProcess/SelectProcess.jsx";
import DashboardHome from "../Components/Dashboard/DashboardHome/DashboardHome.jsx";
import Payment from "../Components/Dashboard/Payment/Payment.jsx";
import EnrolledClasses from "../Components/Dashboard/EnrolledClasses/EnrolledClasses.jsx";
import PaymentHistory from "../Components/Dashboard/EnrolledClasses/PaymentHistory.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>
      },
      {
        path: '/publicClasses',
        element: <Classes></Classes>
      },
      {
        path: 'selectProcess/:id',
        element: <PrivateRoute><SelectProcess></SelectProcess></PrivateRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/${params.id}`)
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "selectedClasses",
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: "enrolledClasses",
        element: <EnrolledClasses></EnrolledClasses>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`https://assignment-12-server-eosin-alpha.vercel.app/selectedClasses/${params.id}`)
      },
      //Instructor Routes
      {
        path: "addClass",
        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: "myClass",
        element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
      },
      {
        path: "update/:id",
        element: <InstructorRoute><UpdateClasses></UpdateClasses></InstructorRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/${params.id}`)
      },
      //Admin Routes
      {
        path: "manageUsers",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "manageClasses",
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
      {
        path: "feedback/:id",
        element: <AdminRoute><FeedbackClass></FeedbackClass></AdminRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/${params.id}`)
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundLayout></NotFoundLayout>,
    children: [
      {
        path: '*',
        element: <NotFound></NotFound>
      }
    ]
  }
]);

export default router;