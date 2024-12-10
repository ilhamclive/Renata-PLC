import React, { useState, useEffect } from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ onApplyFilters }) => {
    const [division, setDivision] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [divisions, setDivisions] = useState([]);

    // Fetch divisions dynamically (This can be adjusted to fetch real data)
    useEffect(() => {
        // Example of division data, replace with real API call if needed
        const fetchedDivisions = ['Dhaka', 'Rajshahi', 'Khulna', 'Sylhet', 'Chattogram', 'Barishal', 'Mymensingh', 'Rangpur'];
        setDivisions(fetchedDivisions);
    }, []);

    const handleFilterApply = () => {
        onApplyFilters({
            Division: division === '' ? 'All Divisions' : division,
            Gender: gender === '' ? 'All Genders' : gender,
            MaritalStatus: maritalStatus === '' ? 'All Statuses' : maritalStatus,
        });
    };

    return (
        <div className="filter-bar">
            <div className="filter-item">
                <label htmlFor="division">Division:</label>
                <select
                    id="division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                >
                    <option value="">All Divisions</option>
                    {divisions.map((division, index) => (
                        <option key={index} value={division}>
                            {division}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-item">
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">All Genders</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>

            <div className="filter-item">
                <label htmlFor="maritalStatus">Marital Status:</label>
                <select
                    id="maritalStatus"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                </select>
            </div>

            <button className="apply-filters" onClick={handleFilterApply}>Apply Filters</button>
        </div>
    );
};

export default FilterBar;