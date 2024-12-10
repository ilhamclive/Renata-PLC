import axios from 'axios';
import { BASE_URL } from './config';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Fetch all CSV data
export const fetchCsvData = async () => {
    try {
        const response = await apiClient.get('/csv-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        throw error;
    }
};

// Fetch filtered CSV data
export const fetchFilteredCsvData = async (filters) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await apiClient.get(`/csv-data/filter?${queryString}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered CSV data:', error);
        throw error;
    }
};

// Fetch DataERD
export const fetchDataErd = async () => {
    try {
        const response = await apiClient.get('/erd/data-erd');
        return response.data;
    } catch (error) {
        console.error('Error fetching DataERD:', error);
        throw error;
    }
};

// Fetch SystemERD
export const fetchSystemErd = async () => {
    try {
        const response = await apiClient.get('/erd/system-erd');
        return response.data;
    } catch (error) {
        console.error('Error fetching SystemERD:', error);
        throw error;
    }
};

export default apiClient;