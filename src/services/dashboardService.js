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
  if (profileData.menuType) formData.append('menuType', profileData.menuType);
  
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

// Combo menu related functions
export const getComboMenuItems = async () => {
  const response = await axios.get(`${API_URL}/combo-menu`, authHeader());
  return response.data;
};

export const addCombo = async (comboData) => {
  try {
    const response = await axios.post(
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
    const response = await axios.put(
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
    const response = await axios.delete(
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
    const response = await axios.post(
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
    const response = await axios.delete(
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
    const response = await axios.post(
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
    const response = await axios.delete(
      `${API_URL}/combo-menu/side/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting side option:', error);
    throw error;
  }
};
