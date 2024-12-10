const axios = require('axios');
const Papa = require('papaparse');

// In-memory storage for parsed CSV data
let cachedData = [];

// Fetch and parse CSV data, store it in-memory
const fetchAllCsvData = async (req, res) => {
    try {
        if (cachedData.length === 0) {
            const csvUrl = process.env.CSV_URL;
            const response = await axios.get(csvUrl);

            const parsedData = Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });

            // Store parsed data in memory
            cachedData = parsedData.data;
        }

        res.json(cachedData);
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        res.status(500).json({ error: 'Failed to fetch or parse CSV data' });
    }
};

// Apply filters to in-memory data
const fetchFilteredCsvData = (req, res) => {
    try {
        if (cachedData.length === 0) {
            return res.status(400).json({ error: 'Data not loaded yet. Please fetch all data first.' });
        }

        const filters = req.query;

        const filteredData = cachedData.filter((row) => {
            return Object.entries(filters).every(([key, value]) => {
                // If the value is "All", ignore this filter
                if (value === '' || value === 'All Divisions' || value === 'All Genders' || value === 'All Statuses') {
                    return true; // Include all values for this filter
                }

                // Otherwise, apply the filter
                return String(row[key]).toLowerCase() === String(value).toLowerCase();
            });
        });

        res.json(filteredData);
    } catch (error) {
        console.error('Error filtering data:', error);
        res.status(500).json({ error: 'Failed to filter CSV data' });
    }
};


module.exports = { fetchAllCsvData, fetchFilteredCsvData };