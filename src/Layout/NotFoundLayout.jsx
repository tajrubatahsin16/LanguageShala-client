import React from "react";
import { Outlet } from "react-router-dom";

const NotFoundLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}

export default NotFoundLayout;