import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import DataDisplay from '../components/DataDisplay';
import FilterBar from '../components/FilterBar';
import { fetchCsvData, fetchFilteredCsvData } from '../utils/api';

const TablePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all data on initial load
    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedData = await fetchCsvData();
                setData(fetchedData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load data.');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Apply filters and fetch filtered data
    const handleApplyFilters = async (filters) => {
        setLoading(true);
        try {
            const filteredData = await fetchFilteredCsvData(filters);
            setData(filteredData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching filtered data:', err);
            setError('Failed to apply filters.');
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <h1>Table Content</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <>
                    <FilterBar onApplyFilters={handleApplyFilters} />
                    <DataDisplay data={data} />
                </>
            )}
        </DashboardLayout>
    );
};

export default TablePage;