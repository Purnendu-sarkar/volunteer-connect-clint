import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;