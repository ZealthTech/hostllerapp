import axios from 'axios';
import {BASE_URL} from '../utils/constants/apiEndPoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Common function to handle GET request
export const apiGet = async (endpoint, params = {}, token = null) => {
  console.log('endpoint, data, token = null ', endpoint, params, token);
  try {
    const response = await axiosInstance.get(endpoint, {
      params,
      headers: token ? {Authorization: `${token}`} : {},
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

// Common function to handle POST request
export const apiPost = async (endpoint, data, token = null) => {
  console.log('endpoint, data, token = null ', endpoint, data, token);
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: token ? {Authorization: `${token}`} : {},
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
    const headers = {
      'Content-Type': 'multipart/form-data', // Set the Content-Type explicitly
    };
    if (token) {
      headers.Authorization = `${token}`;
    }

    // POST request with Axios
    const response = await axiosInstance.post(endpoint, formData, {headers});
    return response.data; // Return the response data
  } catch (error) {
    return handleError(error); // Handle errors centrally
  }
};

// Centralized error handling function
const handleError = error => {
  console.log('82 ', error);
  if (error.response) {
    // Server responded with a status other than 2xx
    return {
      status: false,
      message: error.response.data.message || 'Something went wrong.',
    };
  } else if (error.request) {
    // No response was received from the server
    return {status: false, message: 'No response from server.'};
  } else {
    // Something else went wrong
    return {status: false, message: error.message};
  }
};
