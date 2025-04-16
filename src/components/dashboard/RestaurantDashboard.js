import React, { useState, useEffect } from 'react';
import './RestaurantDashboard.css';
import * as dashboardService from '../../services/dashboardService';

const RestaurantDashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'main',
    quantity: '0',
    isAvailable: true
  });
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    address: '',
    phone: '',
    openTime: '09:00',
    closeTime: '22:00',
    isOpen: true,
    logoImage: null,
    mapImage: null
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [mapPreview, setMapPreview] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurantInfo();
  }, []);

  const fetchRestaurantInfo = async () => {
    try {
      // Get restaurant info from localStorage for now
      const restaurantName = localStorage.getItem('restaurantName');
      if (restaurantName) {
        setRestaurantInfo(prevInfo => ({
          ...prevInfo,
          name: restaurantName
        }));
      }
    } catch (error) {
      console.error('Error fetching restaurant info:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await dashboardService.getMenuItems();
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!newItem.name || !newItem.price || !newItem.description) {
        alert('Please fill in all required fields');
        return;
      }

      // Convert price and quantity to numbers
      const itemToAdd = {
        ...newItem,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity) || 0
      };

      const response = await dashboardService.addMenuItem(itemToAdd);
      if (response.data) {
        setFoodItems([...foodItems, response.data]);
        // Reset form
        setNewItem({
          name: '',
          price: '',
          description: '',
          category: 'main',
          quantity: '0',
          isAvailable: true
        });
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await dashboardService.deleteMenuItem(id);
      setFoodItems(foodItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const toggleItemAvailability = async (id) => {
    try {
      const item = foodItems.find(item => item._id === id);
      const response = await dashboardService.updateMenuItem(id, {
        ...item,
        isAvailable: !item.isAvailable
      });
      setFoodItems(foodItems.map(item => 
        item._id === id ? response.data : item
      ));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const updateRestaurantStatus = async () => {
    try {
      const { openTime, closeTime, isOpen } = restaurantInfo;
      await dashboardService.updateRestaurantStatus({ openTime, closeTime, isOpen });
    } catch (error) {
      console.error('Error updating restaurant status:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const profileData = { ...restaurantInfo };
      
      console.log('Sending profile update data:', profileData);
      
      // Send update request
      const response = await dashboardService.updateRestaurantProfile(profileData);
      console.log('Profile update response:', response);
      
      if (response && response.success) {
        alert('Profile updated successfully!');
        setIsEditingProfile(false);
        
        // Update local storage if name changed
        if (profileData.name !== localStorage.getItem('restaurantName')) {
          localStorage.setItem('restaurantName', profileData.name);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error details:', error.response?.data || 'No error details available');
      alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurantInfo(prev => ({ ...prev, logoImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurantInfo(prev => ({ ...prev, mapImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMapPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    updateRestaurantStatus();
  }, [restaurantInfo.openTime, restaurantInfo.closeTime, restaurantInfo.isOpen]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Restaurant Dashboard</h1>
        <div className="restaurant-status">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={restaurantInfo.isOpen}
              onChange={() => setRestaurantInfo({...restaurantInfo, isOpen: !restaurantInfo.isOpen})}
            />
            <span className="slider round"></span>
          </label>
          <span>{restaurantInfo.isOpen ? 'Open' : 'Closed'}</span>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="restaurant-profile">
          <div className="section-header">
            <h2>Restaurant Profile</h2>
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Restaurant Name</label>
                  <input
                    type="text"
                    value={restaurantInfo.name}
                    onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={restaurantInfo.phone}
                    onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={restaurantInfo.address}
                  onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Restaurant Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  {logoPreview && (
                    <div className="image-preview">
                      <img src={logoPreview} alt="Logo Preview" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Restaurant Map</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMapChange}
                  />
                  {mapPreview && (
                    <div className="image-preview">
                      <img src={mapPreview} alt="Map Preview" />
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="save-profile-btn">Save Profile</button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {restaurantInfo.name}</p>
              <p><strong>Phone:</strong> {restaurantInfo.phone}</p>
              <p><strong>Address:</strong> {restaurantInfo.address}</p>
            </div>
          )}
        </section>

        <section className="restaurant-hours">
          <h2>Operating Hours</h2>
          <div className="hours-inputs">
            <div className="time-input">
              <label>Opening Time:</label>
              <input 
                type="time" 
                value={restaurantInfo.openTime}
                onChange={(e) => setRestaurantInfo({...restaurantInfo, openTime: e.target.value})}
              />
            </div>
            <div className="time-input">
              <label>Closing Time:</label>
              <input 
                type="time" 
                value={restaurantInfo.closeTime}
                onChange={(e) => setRestaurantInfo({...restaurantInfo, closeTime: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="add-food-section">
          <h2>Add New Food Item</h2>
          <form onSubmit={handleAddItem} className="add-food-form">
            <div className="form-row">
              <div className="form-group">
                <label>Food Name</label>
                <input
                  type="text"
                  placeholder="Enter food name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <div className="price-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter food description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="main">Main Course</option>
                  <option value="starter">Starter</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>
              <div className="form-group">
                <label>Initial Availability</label>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={newItem.isAvailable}
                    onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <button type="submit" className="add-item-btn">
              <span className="btn-icon">+</span>
              Add New Item
            </button>
          </form>
        </section>

        <section className="food-items-list">
          <h2>Menu Items</h2>
          <div className="items-grid">
            {foodItems.map(item => (
              <div key={item._id} className="food-item-card">
                <div className="food-item-header">
                  <h3>{item.name}</h3>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    ×
                  </button>
                </div>
                <p className="food-price">${item.price}</p>
                <p className="food-description">{item.description}</p>
                <div className="food-item-footer">
                  <span className={`category-tag ${item.category}`}>
                    {item.category}
                  </span>
                  <div className="item-availability">
                    <label className="switch item-switch">
                      <input 
                        type="checkbox" 
                        checked={item.isAvailable}
                        onChange={() => toggleItemAvailability(item._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={item.isAvailable ? 'available-text' : 'unavailable-text'}>
                      {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
