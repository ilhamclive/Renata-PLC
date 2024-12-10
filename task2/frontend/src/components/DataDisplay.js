import React from 'react';

const DataDisplay = ({ data }) => {
    if (!data.length) {
        return <p>No data available.</p>;
    }

    return (
        <div>
            <h2>Customer Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Division</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>Age</th>
                        <th>Income</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item['Customer Name']}</td>
                            <td>{item.Division}</td>
                            <td>{item.Gender}</td>
                            <td>{item.MaritalStatus}</td>
                            <td>{item.Age}</td>
                            <td>{item.Income}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataDisplay;