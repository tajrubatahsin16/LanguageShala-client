import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Instructors.css';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const navigate = useNavigate();
    const url = 'https://assignment-12-server-eosin-alpha.vercel.app/allInstructors'

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
                    setInstructors(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <>
            <div className="font-serif font-bold text-3xl text-center my-4">Available Instructors</div>
            <div className="teachers container mx-auto">
                {
                    instructors.map(instructor => <div key={instructor._id} className="card card-compact w-96 bg-base-100 shadow-xl font-serif p-5 my-5">
                        <figure><img src={instructor.img} alt="Not Available" style={{width: "200px", height: "200px"}} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{instructor.name}</h2>
                            <p>{instructor.email}</p>
                            <p>To know more about instructors, go to the <Link to="/publicClasses" style={{color: "blue"}}>Classes</Link></p>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
}
export default Instructors;