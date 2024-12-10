import React from 'react';
import SystemERD from '../components/SystemERD';
import DashboardLayout from '../components/DashboardLayout';

const SystemERDPage = () => {
    return (
        <DashboardLayout>
            <h1>System ERD Diagram</h1>
            <SystemERD />
        </DashboardLayout>
    );
};

export default SystemERDPage;