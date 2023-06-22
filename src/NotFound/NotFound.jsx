import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/NotFound.jpg'
import './NotFound.css';

const NotFound = () => {
    return (
        <div>
            <Link to="/" className="btn my-4 font-serif font-bold bg-orange-300 absolute left-96"><button>Back to the Home</button></Link>
            <img className="photo my-5 rounded" src={img} alt="" />
        </div>
    );
}

export default NotFound;