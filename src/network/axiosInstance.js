import axios from 'axios';
import {BASE_URL} from '../utils/constants/apiEndPoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000,
});

// Common function to handle GET request
export const apiGet = async (endpoint, params = {}, token = null) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params,
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

// Common function to handle POST request
export const apiPost = async (endpoint, data, token = null) => {
  console.log('24 ', data, token);
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

// Common function to handle PUT request
export const apiPut = async (endpoint, data, token = null) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

// Common function to handle DELETE request
export const apiDelete = async (endpoint, params = {}, token = null) => {
  try {
    const response = await axiosInstance.delete(endpoint, {
      params,
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

export const postDataWithImages = async (endpoint, formData, token = null) => {
  console.log('Sending data to:', endpoint);
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `${token}`;
    }

    // POST request with Axios
    const response = await axiosInstance.post(endpoint, formData, {headers});
    return response.data; // Return the response data
  } catch (error) {
    console.error('Request failed:', error.message);
    return handleError(error); // Handle errors centrally
  }
};

// Centralized error handling function
const handleError = error => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Response error:', error.response);
    return {
      success: false,
      message: error.response.data.message || 'Something went wrong.',
    };
  } else if (error.request) {
    // No response was received from the server
    console.error('Request error:', error.request);
    return {success: false, message: 'No response from server.'};
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
    return {success: false, message: error.message};
  }
};
