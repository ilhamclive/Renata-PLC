import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = ({ data }) => {
    // Calculate total income per division
    const divisions = [...new Set(data.map((item) => item.Division))];
    const incomeByDivision = divisions.map((division) =>
        data
            .filter((item) => item.Division === division)
            .reduce((total, item) => total + item.Income, 0)
    );

    // Chart.js configuration
    const chartData = {
        labels: divisions,
        datasets: [
            {
                label: 'Total Income',
                data: incomeByDivision,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `Income: ${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Division',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Income',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Income by Division</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DataChart;