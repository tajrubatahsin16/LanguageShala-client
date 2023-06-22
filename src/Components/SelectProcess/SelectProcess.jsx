import React from "react";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { Form, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SelectProcess = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const selectClass = useLoaderData();
    const { _id, photo, name, instructor, email, seats, price } = selectClass;
    const handleSelectingClass = () => {
        // e.preventDefault();
        // const form = e.target;
        // const student = form.student.value;
        // const sEmail = form.sEmail.value;
        const student = user?.displayName;
        const sEmail = user?.email;
        const selectedClass = { name, photo, instructor, email, seats, price, student, sEmail }

        fetch('https://assignment-12-server-eosin-alpha.vercel.app/selectedClasses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectedClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class Selected',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return (
        <div>
            {
                (!isAdmin && !isInstructor && !(seats === 0) ? <div className="overflow-x-auto mx-auto">
                    <table className="table table-zebra w-full">
                        <thead className="font-serif font-extrabold text-lg">
                            <tr>
                                <th>Class Photo</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor Email</th>
                                <th>Total Seats</th>
                                <th>Price</th>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-serif font-semibold">
                            <tr key={_id}>
                                <td style={{ width: "150px", height: "150px" }}><img src={photo} className="rounded-lg" alt="" /></td>
                                <td>{name}</td>
                                <td>{instructor}</td>
                                <td>{email}</td>
                                <td>{seats}</td>
                                <td>{price}</td>
                                <td>{user?.displayName}</td>
                                <td>{user?.email}</td>
                                <td><button onClick={handleSelectingClass} className="btn bg-orange-300">Select Class</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div> : <></>)
            }
        </div>
    );
}
export default SelectProcess;