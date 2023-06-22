import React, { useContext } from "react";
import icon from '../../../public/icon.png';
import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
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
                    <li><Link to="/dashboard/dashboardHome">Dashboard</Link></li>
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
    );
}
export default NavBar;