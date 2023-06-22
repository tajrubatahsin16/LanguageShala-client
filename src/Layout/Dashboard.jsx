import React, { useContext } from "react";
import useAdmin from '../hooks/useAdmin.jsx';
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider.jsx";
import icon from '../../public/icon.png';
import '../Shared/NavBar/NavBar.css';
import useInstructor from "../hooks/useInstructor.jsx";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <div className="navbar bg-orange-200 nBar">
                <div className="navbar-start gap-0 logo">
                    <img src={icon} style={{ width: "40px", height: "40px" }} alt="" />
                    <h1 className="text-4xl font-bold font-serif not-italic hover:italic">LanguageShala</h1>
                </div>
                <div className="navbar-center font-serif lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/instructors">Instructors</Link></li>
                        <li><Link to="/publicClasses">Classes</Link></li>
                        {
                            isAdmin && <div className="flex">
                                <li><Link to="/dashboard/manageClasses">Manage Classes</Link></li>
                                <li><Link to="/dashboard/manageUsers">Manage Users</Link></li>
                            </div>
                        }
                        {
                            isInstructor && <div className="flex">
                                <li><Link to="/dashboard/addClass">Add Class</Link></li>
                                <li><Link to="/dashboard/myClass">My Classes</Link></li>
                            </div>
                        }
                        {
                            (!isAdmin && !isInstructor) && <div className="flex">
                                <li><Link to="/dashboard/selectedClasses">My Selected Classes</Link></li>
                                <li><Link to="/dashboard/enrolledClasses">My Enrolled Classes</Link></li>
                                <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
                            </div>
                        }
                    </ul>
                </div>
                <div className="navbar-end font-serif">
                    {
                        user ? <>
                            <div className="tooltip" data-tip={user.displayName}>
                                <img className="me-3 border-warning rounded" src={user.photoURL} alt="" width="50px" height="50px" />
                            </div>
                            <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                        </> : <>
                            <Link to="/login"><button className="btn bg-orange-300">Login</button></Link>
                        </>
                    }
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
}
export default Dashboard;