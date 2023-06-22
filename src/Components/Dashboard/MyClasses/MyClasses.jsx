import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const MyClasses = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const url = `https://assignment-12-server-eosin-alpha.vercel.app/classes?email=${user?.email}`

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
                    setClasses(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <div className="w-full">
            <h3 className="text-3xl font font-serif text-center font-bold my-4">My Classes</h3>
            <div className="overflow-x-auto mx-auto">
                <table className="table table-zebra w-full">
                    <thead className="font-serif font-extrabold text-lg">
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Enrolled Students</th>
                            <th>Action</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody className="font-serif font-semibold">
                        {
                            classes.map((c, index) => <tr key={c._id}>
                                <th>{index + 1}</th>
                                <td><img src={c.photo} className="rounded-lg" alt="" style={{width: "150px", height: "150px"}} /></td>
                                <td>{c.name}</td>
                                <td>{c.instructor}</td>
                                <td>{c.seats}</td>
                                <td>{c.price}</td>
                                <td>{c.status}</td>
                                <td>0</td>
                                <td><Link to={`/dashboard/update/${c._id}`}><button className="btn bg-orange-300">Update Info</button></Link></td>
                                <td>{c.feedback}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default MyClasses;