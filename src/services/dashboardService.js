import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://rahulpr2408-github-io.onrender.com';
const API_URL = `${API_BASE_URL}/api/dashboard`;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('restaurantToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('restaurantToken');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.', {
        position: "top-center"
      });
    } else {
      // Request setup error
      toast.error('Error setting up request', {
        position: "top-center"
      });
    }
    return Promise.reject(error);
  }
);

// Use axiosInstance for all API calls
const authHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('restaurantToken') || localStorage.getItem('token')}`
  }
});

// Export the configured axios instance
export { axiosInstance };

// Rest of your API functions using axiosInstance
export const updateRestaurantProfile = async (profileData) => {
  const formData = new FormData();
  
  // Add regular fields
  if (profileData.name) formData.append('name', profileData.name);
  if (profileData.address) formData.append('address', profileData.address);
  if (profileData.phone) formData.append('phone', profileData.phone);
  if (profileData.openTime) formData.append('openTime', profileData.openTime);
  if (profileData.closeTime) formData.append('closeTime', profileData.closeTime);
  if (profileData.isOpen !== undefined) formData.append('isOpen', profileData.isOpen);
  if (profileData.menuType) formData.append('menuType', profileData.menuType);
  
  // Add files if present
  if (profileData.logoImage) formData.append('logoImage', profileData.logoImage);
  if (profileData.mapImage) formData.append('mapImage', profileData.mapImage);
  
  const response = await axiosInstance.post('/api/dashboard/restaurant/profile', formData);
  return response.data;
};

export const updateRestaurantStatus = async (statusData) => {
  const response = await axiosInstance.put(
    `${API_URL}/restaurant/status`,
    statusData,
    authHeader()
  );
  return response.data;
};

export const getMenuItems = async () => {
  const response = await axiosInstance.get(`${API_URL}/menu-items`, authHeader());
  return response.data;
};

export const addMenuItem = async (menuItem) => {
  const response = await axiosInstance.post(
    `${API_URL}/menu-items`,
    menuItem,
    authHeader()
  );
  return response.data;
};

export const updateMenuItem = async (id, menuItem) => {
  const response = await axiosInstance.put(
    `${API_URL}/menu-items/${id}`,
    menuItem,
    authHeader()
  );
  return response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await axiosInstance.delete(
    `${API_URL}/menu-items/${id}`,
    authHeader()
  );
  return response.data;
};

export const API_URLS = {
  RESTAURANT_SIGNUP: `${API_BASE_URL}/api/auth/restaurant/signup`,
  RESTAURANT_LOGIN: `${API_BASE_URL}/api/auth/restaurant/login`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
};

// Combo menu related functions
export const getComboMenuItems = async () => {
  const response = await axiosInstance.get(`${API_URL}/combo-menu`, authHeader());
  return response.data;
};

export const addCombo = async (comboData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/combo-menu/combo`,
      comboData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding combo:', error);
    throw error;
  }
};

export const updateCombo = async (id, comboData) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/combo-menu/combo/${id}`,
      comboData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating combo:', error);
    throw error;
  }
};

export const deleteCombo = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/combo-menu/combo/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting combo:', error);
    throw error;
  }
};

export const addProteinOption = async (proteinData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/combo-menu/protein`,
      proteinData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding protein option:', error);
    throw error;
  }
};

export const deleteProteinOption = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/combo-menu/protein/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting protein option:', error);
    throw error;
  }
};

export const addSideOption = async (sideData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/combo-menu/side`,
      sideData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding side option:', error);
    throw error;
  }
};

export const deleteSideOption = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/combo-menu/side/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting side option:', error);
    throw error;
  }
};
