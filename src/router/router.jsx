import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../components/Home';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import AddVolunteer from '../pages/AllPage/AddVolunteer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Not found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/logIn',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: '/volunteer-needs',
                element: <AddVolunteer></AddVolunteer>
            }
        ]
    }
])

export default router;