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
    openTime: '09:00',
    closeTime: '22:00',
    isOpen: true
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

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
      await dashboardService.updateRestaurantStatus(restaurantInfo);
    } catch (error) {
      console.error('Error updating restaurant status:', error);
    }
  };

  useEffect(() => {
    updateRestaurantStatus();
  }, [restaurantInfo]);

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
