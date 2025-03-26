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
