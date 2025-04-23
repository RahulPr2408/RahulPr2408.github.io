import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
    mapImage: null,
    menuType: 'standard'
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [mapPreview, setMapPreview] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Add state for combo menu
  const [comboOptions, setComboOptions] = useState([]);
  const [proteinOptions, setProteinOptions] = useState([]);
  const [sideOptions, setSideOptions] = useState([]);
  const [newCombo, setNewCombo] = useState({ name: '', description: '', originalPrice: '', salePrice: '' });
  const [newProtein, setNewProtein] = useState({ name: '' });
  const [newSide, setNewSide] = useState({ name: '' });
  const [isAddingCombo, setIsAddingCombo] = useState(false);
  const [isAddingProtein, setIsAddingProtein] = useState(false);
  const [isAddingSide, setIsAddingSide] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);

  const getImageUrl = (imageData, type) => {
    if (!imageData) return '';

    // Handle new structure where imageData might be an object with url property
    const imageUrl = typeof imageData === 'object' ? imageData.url : imageData;
    if (!imageUrl) return '';

    // Add Cloudinary transformations for preview
    return imageUrl.replace('/upload/', '/upload/w_400,c_scale,q_auto/');
  };

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurantInfo();
    if (localStorage.getItem('menuType') === 'combo') {
      fetchComboMenuData();
    }
  }, []);

  const fetchRestaurantInfo = async () => {
    try {
      const response = await dashboardService.getRestaurantProfile();
      if (response.success && response.data) {
        const restaurant = response.data;
        setRestaurantInfo({
          name: restaurant.name,
          address: restaurant.address,
          phone: restaurant.phone,
          openTime: restaurant.openTime,
          closeTime: restaurant.closeTime,
          isOpen: restaurant.isOpen,
          logoImage: restaurant.logoImage?.url || restaurant.logoImage,
          mapImage: restaurant.mapImage?.url || restaurant.mapImage,
          menuType: restaurant.menuType || 'standard'
        });

        // Set image previews using Cloudinary URLs
        if (restaurant.logoImage) {
          setLogoPreview(getImageUrl(restaurant.logoImage, 'logo'));
        }
        if (restaurant.mapImage) {
          setMapPreview(getImageUrl(restaurant.mapImage, 'map'));
        }

        // Also update localStorage
        localStorage.setItem('restaurantName', restaurant.name);
        localStorage.setItem('menuType', restaurant.menuType);

        // If it's a combo menu restaurant, fetch combo data
        if (restaurant.menuType === 'combo') {
          fetchComboMenuData();
        }
      }
    } catch (error) {
      console.error('Error fetching restaurant info:', error);
      toast.error('Failed to fetch restaurant information. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await dashboardService.getMenuItems();
      if (response.success && response.data) {
        setFoodItems(response.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to fetch menu items. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
  };

  const fetchComboMenuData = async () => {
    try {
      const response = await dashboardService.getComboMenuItems();
      if (response.data) {
        const { combos, proteins, sides } = response.data;
        if (combos) setComboOptions(combos);
        if (proteins) setProteinOptions(proteins);
        if (sides) setSideOptions(sides);
      }
    } catch (error) {
      console.error('Error fetching combo menu data:', error);
      // In case of error, the default state values will be used
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
      const response = await dashboardService.updateRestaurantStatus({ 
        openTime, 
        closeTime, 
        isOpen 
      });
      
      if (response.success && response.data) {
        setRestaurantInfo(prev => ({
          ...prev,
          isOpen: response.data.isOpen,
          openTime: response.data.openTime,
          closeTime: response.data.closeTime
        }));
      }
    } catch (error) {
      console.error('Error updating restaurant status:', error);
      toast.error('Failed to update restaurant status. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
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
        
        // Update menuType in local storage
        localStorage.setItem('menuType', profileData.menuType);
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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setRestaurantInfo(prev => ({ ...prev, logoImage: file }));
      
      // Create optimized preview
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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setRestaurantInfo(prev => ({ ...prev, mapImage: file }));
      
      // Create optimized preview
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

  // Add handlers for combo menu
  const handleAddCombo = async () => {
    if (!newCombo.name || !newCombo.description || !newCombo.originalPrice || !newCombo.salePrice) {
      alert('Please fill in all combo details');
      return;
    }

    try {
      const comboToAdd = {
        ...newCombo,
        originalPrice: parseFloat(newCombo.originalPrice),
        salePrice: parseFloat(newCombo.salePrice)
      };

      const response = await dashboardService.addCombo(comboToAdd);
      if (response.data) {
        setComboOptions([...comboOptions, response.data]);
        setNewCombo({ name: '', description: '', originalPrice: '', salePrice: '' });
        setIsAddingCombo(false);
      }
    } catch (error) {
      console.error('Error adding combo:', error);
      alert('Failed to add combo: ' + (error.message || 'Unknown error'));
    }
  };

  const handleUpdateCombo = async () => {
    if (!editingCombo || !editingCombo.name || !editingCombo.description || 
        !editingCombo.originalPrice || !editingCombo.salePrice) {
      alert('Please fill in all combo details');
      return;
    }

    try {
      const comboToUpdate = {
        ...editingCombo,
        originalPrice: parseFloat(editingCombo.originalPrice),
        salePrice: parseFloat(editingCombo.salePrice)
      };

      const response = await dashboardService.updateCombo(editingCombo._id, comboToUpdate);
      if (response.data) {
        setComboOptions(comboOptions.map(combo => 
          combo._id === editingCombo._id ? response.data : combo
        ));
        setEditingCombo(null);
      }
    } catch (error) {
      console.error('Error updating combo:', error);
      alert('Failed to update combo: ' + (error.message || 'Unknown error'));
    }
  };

  const handleRemoveCombo = async (id) => {
    if (!id) {
      console.error('Cannot remove combo: Invalid ID');
      alert('Cannot remove this combo: Invalid ID');
      return;
    }
    
    try {
      await dashboardService.deleteCombo(id);
      setComboOptions(comboOptions.filter(combo => combo._id !== id));
    } catch (error) {
      console.error('Error removing combo:', error);
      alert('Failed to remove combo: ' + (error.message || 'Unknown error'));
    }
  };

  const handleAddProtein = async () => {
    if (!newProtein.name) {
      alert('Please enter a protein name');
      return;
    }

    try {
      const response = await dashboardService.addProteinOption(newProtein);
      if (response.data) {
        setProteinOptions([...proteinOptions, response.data]);
        setNewProtein({ name: '' });
        setIsAddingProtein(false);
      }
    } catch (error) {
      console.error('Error adding protein option:', error);
      alert('Failed to add protein: ' + (error.message || 'Unknown error'));
    }
  };

  const handleRemoveProtein = async (id) => {
    if (!id) {
      console.error('Cannot remove protein: Invalid ID');
      alert('Cannot remove this protein: Invalid ID');
      return;
    }
    
    try {
      await dashboardService.deleteProteinOption(id);
      setProteinOptions(proteinOptions.filter(protein => protein._id !== id));
    } catch (error) {
      console.error('Error removing protein option:', error);
      alert('Failed to remove protein: ' + (error.message || 'Unknown error'));
    }
  };

  const handleAddSide = async () => {
    if (!newSide.name) {
      alert('Please enter a side name');
      return;
    }

    try {
      const response = await dashboardService.addSideOption(newSide);
      if (response.data) {
        setSideOptions([...sideOptions, response.data]);
        setNewSide({ name: '' });
        setIsAddingSide(false);
      }
    } catch (error) {
      console.error('Error adding side option:', error);
      alert('Failed to add side: ' + (error.message || 'Unknown error'));
    }
  };

  const handleRemoveSide = async (id) => {
    if (!id) {
      console.error('Cannot remove side: Invalid ID');
      alert('Cannot remove this side: Invalid ID');
      return;
    }
    
    try {
      await dashboardService.deleteSideOption(id);
      setSideOptions(sideOptions.filter(side => side._id !== id));
    } catch (error) {
      console.error('Error removing side option:', error);
      alert('Failed to remove side: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{restaurantInfo.name} Dashboard</h1>
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
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview"
                        className="preview-image"
                      />
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
                      <img 
                        src={mapPreview} 
                        alt="Map Preview"
                        className="preview-image"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Menu Type</label>
                  <select
                    value={restaurantInfo.menuType}
                    onChange={(e) => setRestaurantInfo({...restaurantInfo, menuType: e.target.value})}
                  >
                    <option value="standard">Standard Menu</option>
                    <option value="combo">Combo Menu</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="save-profile-btn">Save Profile</button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {restaurantInfo.name}</p>
              <p><strong>Phone:</strong> {restaurantInfo.phone}</p>
              <p><strong>Address:</strong> {restaurantInfo.address}</p>
              <p><strong>Menu Type:</strong> {restaurantInfo.menuType === 'standard' ? 'Standard Menu' : 'Combo Menu'}</p>
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

        {/* Conditional rendering based on menu type */}
        {restaurantInfo.menuType === 'standard' ? (
          <>
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
          </>
        ) : (
          <section className="combo-menu-section">
            <h2>Combo Menu Management</h2>
            <div className="combo-menu-container">
              <div className="combo-options">
                
                {comboOptions.map(combo => (
                  <div key={combo._id} className="combo-card">
                    <h4>{combo.name} ({combo.description})</h4>
                    <div className="price-display">
                      <div className="original-price">${combo.originalPrice.toFixed(2)}</div>
                      <div className="sale-price">${combo.salePrice.toFixed(2)}</div>
                    </div>
                    <div className="combo-actions">
                      <button 
                        className="edit-combo-btn"
                        onClick={() => setEditingCombo(combo)}
                      >
                        Edit
                      </button>
                      <button 
                        className="remove-combo-btn"
                        onClick={() => handleRemoveCombo(combo._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {isAddingCombo ? (
                  <div className="new-combo-form">
                    <h4>Add New Combo</h4>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={newCombo.name}
                        onChange={(e) => setNewCombo({...newCombo, name: e.target.value})}
                        placeholder="e.g., Combo 2"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input 
                        type="text" 
                        value={newCombo.description}
                        onChange={(e) => setNewCombo({...newCombo, description: e.target.value})}
                        placeholder="e.g., 2 Proteins + 1 Side"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Original Price</label>
                        <div className="price-input">
                          <span className="currency-symbol">$</span>
                          <input 
                            type="number" 
                            value={newCombo.originalPrice}
                            onChange={(e) => setNewCombo({...newCombo, originalPrice: e.target.value})}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Sale Price</label>
                        <div className="price-input">
                          <span className="currency-symbol">$</span>
                          <input 
                            type="number" 
                            value={newCombo.salePrice}
                            onChange={(e) => setNewCombo({...newCombo, salePrice: e.target.value})}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="combo-form-actions">
                      <button className="save-combo-btn" onClick={handleAddCombo}>Save</button>
                      <button className="cancel-btn" onClick={() => setIsAddingCombo(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="add-combo-btn" onClick={() => setIsAddingCombo(true)}>
                    <span className="btn-icon">+</span>
                    Add New Combo
                  </button>
                )}
                
                {editingCombo && (
                  <div className="edit-combo-form">
                    <h4>Edit Combo</h4>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={editingCombo.name}
                        onChange={(e) => setEditingCombo({...editingCombo, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input 
                        type="text" 
                        value={editingCombo.description}
                        onChange={(e) => setEditingCombo({...editingCombo, description: e.target.value})}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Original Price</label>
                        <div className="price-input">
                          <span className="currency-symbol">$</span>
                          <input 
                            type="number" 
                            value={editingCombo.originalPrice}
                            onChange={(e) => setEditingCombo({...editingCombo, originalPrice: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Sale Price</label>
                        <div className="price-input">
                          <span className="currency-symbol">$</span>
                          <input 
                            type="number" 
                            value={editingCombo.salePrice}
                            onChange={(e) => setEditingCombo({...editingCombo, salePrice: e.target.value})}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="combo-form-actions">
                      <button className="save-combo-btn" onClick={handleUpdateCombo}>Update</button>
                      <button className="cancel-btn" onClick={() => setEditingCombo(null)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="combo-items">
                <div className="combo-item-section">
                  <h3>Proteins</h3>
                  <div className="combo-items-list">
                    {proteinOptions.map(protein => (
                      <div key={protein._id} className="combo-item">
                        <span>{protein.name}</span>
                        <button 
                          className="remove-item-small"
                          onClick={() => handleRemoveProtein(protein._id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {isAddingProtein ? (
                    <div className="new-item-form">
                      <div className="form-group">
                        <input 
                          type="text" 
                          value={newProtein.name}
                          onChange={(e) => setNewProtein({...newProtein, name: e.target.value})}
                          placeholder="Enter protein name"
                        />
                      </div>
                      <div className="item-form-actions">
                        <button className="save-item-btn" onClick={handleAddProtein}>Add</button>
                        <button className="cancel-btn" onClick={() => setIsAddingProtein(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="add-item-small"
                      onClick={() => setIsAddingProtein(true)}
                    >
                      <span className="btn-icon">+</span>
                      Add Protein Option
                    </button>
                  )}
                </div>
                
                <div className="combo-item-section">
                  <h3>Sides</h3>
                  <div className="combo-items-list">
                    {sideOptions.map(side => (
                      <div key={side._id} className="combo-item">
                        <span>{side.name}</span>
                        <button 
                          className="remove-item-small"
                          onClick={() => handleRemoveSide(side._id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {isAddingSide ? (
                    <div className="new-item-form">
                      <div className="form-group">
                        <input 
                          type="text" 
                          value={newSide.name}
                          onChange={(e) => setNewSide({...newSide, name: e.target.value})}
                          placeholder="Enter side name"
                        />
                      </div>
                      <div className="item-form-actions">
                        <button className="save-item-btn" onClick={handleAddSide}>Add</button>
                        <button className="cancel-btn" onClick={() => setIsAddingSide(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="add-item-small"
                      onClick={() => setIsAddingSide(true)}
                    >
                      <span className="btn-icon">+</span>
                      Add Side Option
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;