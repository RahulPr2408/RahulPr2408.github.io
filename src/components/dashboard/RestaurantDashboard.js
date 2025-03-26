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
    quantity: '',
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
      const response = await dashboardService.addMenuItem(newItem);
      setFoodItems([...foodItems, response.data]);
      setNewItem({
        name: '',
        price: '',
        description: '',
        category: 'main',
        quantity: '',
        isAvailable: true
      });
    } catch (error) {
      console.error('Error adding item:', error);
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
            <div className="form-group">
              <input
                type="text"
                placeholder="Food Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
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
              <input
                type="number"
                placeholder="Quantity Available"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="add-item-btn">Add Item</button>
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
                  <button 
                    className={`availability-toggle ${item.isAvailable ? 'available' : 'unavailable'}`}
                    onClick={() => toggleItemAvailability(item._id)}
                  >
                    {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </button>
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
