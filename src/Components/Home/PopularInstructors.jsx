import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './PopularClasses.css';

const PopularInstructors = () => {
    const [popular, setPopular] = useState([]);
    const navigate = useNavigate();
    const url = 'https://assignment-12-server-eosin-alpha.vercel.app/popularInstructors'
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
                    setPopular(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <div className="my-14">
            <h2 className="font-serif font-bold text-black text-3xl text-center">Popular Instructors</h2>
            <div className="container mx-auto my-7 popular gap-8">
                {
                    popular.map(p => <div key={p._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img style={{width:"200px", height: "200px"}} src={p.img} alt="Shoes" /></figure>
                        <div className="card-body font-serif font-semibold text-center">
                            <h2 className="card-title">{p.name}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}
export default PopularInstructors;