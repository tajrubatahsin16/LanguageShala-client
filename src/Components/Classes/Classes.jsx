import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Instructors/Instructors.css';
import useAuth from "../../hooks/useAuth";

const Classes = () => {
    const {user} = useAuth();
    const [approve, setApprove] = useState([]);
    const navigate = useNavigate();
    const url = 'https://assignment-12-server-eosin-alpha.vercel.app/approvedClasses'

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setApprove(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <>
            <div className="font-serif font-bold text-3xl text-center my-4">Available Classes</div>
            <div className="teachers container mx-auto">
                {
                    approve.map(a => <div key={a._id} style={a.seats === 0? {backgroundColor: "red"} : {backgroundColor: "#eee"}} className="card w-96 shadow-xl font-serif p-5 my-5">
                        <figure><img src={a.photo} alt="" style={{width: "200px", height: "200px"}} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{a.name}</h2>
                            <p>Instructor: {a.instructor}</p>
                            <p>Available Seats: {a.seats}</p>
                            <p>Price: {a.price}</p>
                            <div className="card-actions justify-end">
                                {
                                    user ? <Link to={`/selectProcess/${a._id}`}><button className="btn btn-primary">Select Now</button></Link> : <p>You've to <Link to="/login" style={{color: "blue"}}>Login</Link> First to select a Class</p>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
}
export default Classes;