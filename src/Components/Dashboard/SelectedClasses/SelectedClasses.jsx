import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SelectedClasses = () => {
    const { user } = useAuth();
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const url = `https://assignment-12-server-eosin-alpha.vercel.app/selectedClasses?sEmail=${user?.email}`

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
                    setSelected(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch(`https://assignment-12-server-eosin-alpha.vercel.app/selectedClasses/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your Selected Class has been deleted.',
                                    'success'
                                )
                                const remaining = selected.filter(s => s._id !== id);
                                setSelected(remaining);
                            }
                        })
                }
            })
    }
    return (
        <>
            <div className="w-full">
                <h3 className="text-3xl font font-serif text-center font-bold my-4">Selected Classes</h3>
                <div className="overflow-x-auto mx-auto">
                    <table className="table table-zebra w-full">
                        <thead className="font-serif font-extrabold text-lg">
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Email</th>
                                <th>Seats</th>
                                <th>Price</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="font-serif font-semibold">
                            {
                                selected.map((c, index) => <tr key={c._id}>
                                    <th>{index + 1}</th>
                                    <td>{c.student}</td>
                                    <td><img src={c.photo} className="rounded-lg" style={{ width: "150px", height: "150px" }} alt="" /></td>
                                    <td>{c.name}</td>
                                    <td>{c.instructor}</td>
                                    <td>{c.email}</td>
                                    <td>{c.seats}</td>
                                    <td>{c.price}</td>
                                    <td className="flex gap-5 mt-7"><button onClick={() => handleDelete(c._id)} className="btn bg-red-600">Delete</button>
                                        <Link to={`/dashboard/payment/${c._id}`}><button className="btn bg-orange-300">Pay</button></Link>
                                    </td>
                                    {/* <td><button className="btn bg-orange-300">Pay</button></td> */}
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default SelectedClasses;