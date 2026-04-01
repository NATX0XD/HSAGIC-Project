import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat/send`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/chat/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getSubscriptionPlans = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subscription/plans`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscription plans:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};