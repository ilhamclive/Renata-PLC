import React from 'react';
import DataERD from '../components/DataERD';
import DashboardLayout from '../components/DashboardLayout';

const DataERDPage = () => {
    return (
        <DashboardLayout>
            <h1>Data ERD Diagram</h1>
            <DataERD />
        </DashboardLayout>
    );
};

export default DataERDPage;