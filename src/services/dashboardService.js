import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/api/dashboard`;

const authHeader = () => {
  const token = localStorage.getItem('restaurantToken') || localStorage.getItem('token');
  return token ? {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  } : {};
};

export const updateRestaurantProfile = async (profileData) => {
  // Use FormData for file uploads
  const formData = new FormData();
  
  // Add regular fields
  if (profileData.name) formData.append('name', profileData.name);
  if (profileData.address) formData.append('address', profileData.address);
  if (profileData.phone) formData.append('phone', profileData.phone);
  if (profileData.openTime) formData.append('openTime', profileData.openTime);
  if (profileData.closeTime) formData.append('closeTime', profileData.closeTime);
  if (profileData.isOpen !== undefined) formData.append('isOpen', profileData.isOpen);
  
  // Add files if present
  if (profileData.logoImage) formData.append('logoImage', profileData.logoImage);
  if (profileData.mapImage) formData.append('mapImage', profileData.mapImage);
  
  // Get the auth token
  const token = localStorage.getItem('restaurantToken') || localStorage.getItem('token');
  
  // Send request with auth headers and form data
  const response = await axios.post(
    `${API_URL}/restaurant/profile`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type when sending FormData - axios sets it automatically with the boundary
      }
    }
  );
  return response.data;
};

export const updateRestaurantStatus = async (statusData) => {
  const response = await axios.put(
    `${API_URL}/restaurant/status`,
    statusData,
    authHeader()
  );
  return response.data;
};

export const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu-items`, authHeader());
  return response.data;
};

export const addMenuItem = async (menuItem) => {
  const response = await axios.post(
    `${API_URL}/menu-items`,
    menuItem,
    authHeader()
  );
  return response.data;
};

export const updateMenuItem = async (id, menuItem) => {
  const response = await axios.put(
    `${API_URL}/menu-items/${id}`,
    menuItem,
    authHeader()
  );
  return response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await axios.delete(
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
