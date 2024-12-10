import React from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar.js is already implemented
import '../styles/DashboardLayout.css'; // Styles for the Dashboard layout

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;