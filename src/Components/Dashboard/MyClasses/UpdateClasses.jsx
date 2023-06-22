import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Form, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClasses = () => {
    const { user } = useAuth();
    const eachClass = useLoaderData();
    const { _id, photo, name, instructor, email, seats, price, status } = eachClass;
    const handleUpdateClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const instructor = form.instructor.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const status = form.status.value;
        const updateClass = { name, photo, instructor, email, seats, price, status }

        fetch(`https://assignment-12-server-eosin-alpha.vercel.app/classes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                form.reset();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class Info Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return (
        <div className="mt-4">
            <h2 className="text-center font-bold font-serif text-4xl my-6">Update Class Info</h2>
            <Form onSubmit={handleUpdateClass}>
                <div className="flex mb-4 gap-5 mx-6">
                    <div className="form-control md:w-1/2 font-serif font-semibold">
                        <div>
                            <label className="label-text">Class Name</label>
                            <input type="text" name="name" placeholder="Class Name" defaultValue={name} className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control md:w-1/2 ms-3 font-serif font-semibold">
                        <div>
                            <label className="label-text">Class Picture</label>
                            <input type="text" name="photo" placeholder="Class Picture" defaultValue={photo} className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
                <div className="flex mb-4 gap-5 mx-6">
                    <div className="form-control md:w-1/2 font-serif font-semibold">
                        <div>
                            <label className="label-text">Instructor Name</label>
                            <input defaultValue={instructor} type="text" name="instructor" placeholder="Instructor Name" className="input input-bordered w-full" disabled />
                        </div>
                    </div>
                    <div className="form-control md:w-1/2 font-serif font-semibold">
                        <div>
                            <label className="label-text">Instructor Email</label>
                            <input defaultValue={email} type="email" name="email" placeholder="Instructor Email" className="input input-bordered w-full" disabled />
                        </div>
                    </div>
                </div>
                <div className="flex mb-4 gap-5 mx-6">
                    <div className="form-control md:w-1/2 font-serif font-semibold">
                        <div>
                            <label className="label-text fst-italic fw-bold">Available Seats</label>
                            <input name="seats" defaultValue={seats} className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control md:w-1/2 font-serif font-semibold">
                        <div>
                            <label className="label-text fst-italic fw-bold">Price</label>
                            <input type="text" name="price" defaultValue={price} placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
                <div className="mb-4 gap-5 mx-6">
                    <div className="form-control font-serif font-semibold">
                        <div>
                            <label className="label-text">Status</label>
                            <input type="text" name="status" placeholder="Status" defaultValue={status} className="input input-bordered w-full" disabled />
                        </div>
                    </div>
                </div>
                <div className="grid mx-6">
                    <button className="btn bg-orange-300" type="submit" size="lg">
                        Update Class Info
                    </button>
                </div>
            </Form>
        </div>
    );
}
export default UpdateClasses;