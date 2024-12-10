const express = require('express');
const { fetchAllCsvData, fetchFilteredCsvData } = require('../controllers/dataControllers');

const router = express.Router();

// Route to fetch all CSV data
router.get('/csv-data', fetchAllCsvData);

// Route to fetch filtered CSV data
router.get('/csv-data/filter', fetchFilteredCsvData);

module.exports = router;