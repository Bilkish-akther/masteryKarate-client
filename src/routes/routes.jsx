import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/DefaultPages/Home/Home/Home";
import Classes from "../pages/DefaultPages/Classes/Classes";
import Instructors from "../pages/DefaultPages/Instructors/Instructors";
import Login from "../pages/DefaultPages/AuthVerify/Login";
import Registration from "../pages/DefaultPages/AuthVerify/Registration";
import About from "../pages/DefaultPages/About/About";
import Contract from "../pages/DefaultPages/Contract/Contract";
import Dashboard from "../layouts/Dashboard";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import SelectedClasses from "../pages/Dashboard/UserDashboard/SeletedClasses/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/UserDashboard/EnrolledClasses/EnrolledClasses";
import ManageClasses from "../pages/Dashboard/AdminDashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import InstructorRoute from "./PrivateRoutes/InstructorRoute";
import StudentRoute from "./PrivateRoutes/StudentRoute";
import Payment from "../pages/Dashboard/UserDashboard/Payments/Payment";
import PaymentHistory from "../pages/Dashboard/UserDashboard/PaymentHistory/PaymentHistory";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            },
            {
                path: 'instructors',
                element: <Instructors></Instructors>
            },
            {
                path: 'about',
                element: <About></About>
            },
            {
                path: 'contract',
                element: <Contract></Contract>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'registration',
                element: <Registration></Registration>
            }
        ]
    },
    {
       path: 'dashboard',
       element: <Dashboard></Dashboard>,
       children: [
        {
            path:'home',
            element: <DashboardHome></DashboardHome>
        },
        {
            path: 'add-class',
            element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
        },
        {
            path: 'my-classes',
            element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
        },
        {
            path: 'selected-classes',
            element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
        },
        {
            path: 'enrolled-classes',
            element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
        },
        {
            path: 'payment/:id',
            element: <StudentRoute><Payment></Payment></StudentRoute>
        },
        {
            path: 'payment/history',
            element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
        },
        {
            path: 'manage-classes',
            element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
            path: 'manage-users',
            element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        }
       ]
    }
])

export default router;