import React from 'react';
import AdminTopbar from "../components/AdminTopbar";
import AdminSidebar from "../components/AdminSidebar";
import AdminTabContent from "../components/AdminTabContent";
import "./AdminHome.css";

const AdminHome = () => {
    return (
        <div>
            <AdminTopbar/>
            <div className="container">
                <AdminSidebar/>
                <div className="mainDisplay">
                    <AdminTabContent/>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
