import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EnrolledClasses = () => {
    const { user } = useAuth();
    const [enrolled, setEnrolled] = useState([]);
    const navigate = useNavigate();
    const url = `https://assignment-12-server-eosin-alpha.vercel.app/payments?email=${user?.email}`

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
                    setEnrolled(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <>
            <div className="w-full">
                <h3 className="text-3xl font font-serif text-center font-bold my-4">Enrolled Classes</h3>
                <div className="overflow-x-auto mx-auto">
                    <table className="table table-zebra w-full">
                        <thead className="font-serif font-extrabold text-lg">
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Total Seats</th>
                            </tr>
                        </thead>
                        <tbody className="font-serif font-semibold">
                            {
                                enrolled.map((c, index) => <tr key={c._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={c.classPhoto} style={{ width: "150px", height: "150px" }} className="rounded-lg" alt="" /></td>
                                    <td>{c.className}</td>
                                    <td>{c.classInstructor}</td>
                                    <td>{c.classSeats}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default EnrolledClasses;