import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [payment, setPayment] = useState([]);
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
                    setPayment(data)
                }
                else {
                    navigate('/');
                }
            })
    }, [url, navigate])
    return (
        <>
            <div className="w-full">
                <h3 className="text-3xl font font-serif text-center font-bold my-4">Payment History</h3>
                <div className="overflow-x-auto mx-auto">
                    <table className="table table-zebra w-full">
                        <thead className="font-serif font-extrabold text-lg">
                            <tr>
                                <th>#</th>
                                <th>Class Photo</th>
                                <th>Class Name</th>
                                <th>User Email</th>
                                <th>Transaction ID</th>
                                <th>Paid Amount</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody className="font-serif font-semibold">
                            {
                                payment.map((c, index) => <tr key={c._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={c.classPhoto} style={{ width: "150px", height: "150px" }} className="rounded-lg" alt="" /></td>
                                    <td>{c.className}</td>
                                    <td>{c.email}</td>
                                    <td>{c.transactionId}</td>
                                    <td>{c.price}</td>
                                    <td>{c.date}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default PaymentHistory;