import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allClass = [], refetch } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/classes')
        return res.data;
    })
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const url = 'https://assignment-12-server-eosin-alpha.vercel.app/allClasses'

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

    const handleApprove = sClass => {
        fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/approved/${sClass._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${sClass.name} is Approve!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleDeny = c => {
        fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/denied/${c._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${c.name} is Denied!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div className="w-full">
            <h3 className="text-3xl font font-serif text-center font-bold my-4">Manage Classes</h3>
            <div className="overflow-x-auto mx-auto">
                <table className="table table-zebra w-full">
                    <thead className="font-serif font-extrabold text-lg">
                        <tr>
                            <th>#</th>
                            <th>Class Photo</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Total Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="font-serif font-semibold">
                        {
                            classes.map((c, index) => <tr key={c._id}>
                                <th>{index + 1}</th>
                                <td style={{ width: "150px", height: "150px" }}><img src={c.photo} className="rounded-lg" alt="" /></td>
                                <td>{c.name}</td>
                                <td>{c.instructor}</td>
                                <td>{c.email}</td>
                                <td>{c.seats}</td>
                                <td>{c.price}</td>
                                <td>{c.status}</td>
                                <td>{c.status === 'Pending' && <div>
                                    <button onClick={() => handleApprove(c)} className="btn btn-ghost bg-orange-600  text-white me-1">Approve</button>
                                    <button onClick={() => handleDeny(c)} className="btn btn-ghost bg-orange-600 text-white me-1">Deny</button>
                                    <Link to={`/dashboard/feedback/${c._id}`}><button className="btn btn-ghost bg-orange-600  text-white">Feedback</button></Link>
                                </div>}
                                    {
                                        c.status === 'approved' && <div>
                                            <button className="btn btn-ghost bg-orange-600  text-white me-1" disabled>Approve</button>
                                            <button className="btn btn-ghost bg-orange-600  text-white me-1" disabled>Deny</button>
                                            <button className="btn btn-ghost bg-orange-600  text-white" disabled>Feedback</button>
                                        </div>
                                    }
                                    {
                                        c.status === 'denied' && <div>
                                            <button className="btn btn-ghost bg-orange-600  text-white me-1" disabled>Approve</button>
                                            <button className="btn btn-ghost bg-orange-600  text-white me-1" disabled>Deny</button>
                                            <Link to={`/dashboard/feedback/${c._id}`}><button className="btn btn-ghost bg-orange-600  text-white">Feedback</button></Link>
                                        </div>
                                    }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ManageClasses;