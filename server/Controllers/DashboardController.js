const MenuItem = require('../Models/MenuItem');
const Restaurant = require('../Models/Restaurant');

const updateRestaurantStatus = async (req, res) => {
  try {
    const { isOpen, openTime, closeTime } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.restaurant._id,
      { isOpen, openTime, closeTime },
      { new: true }
    );
    res.header('Content-Type', 'application/json')
       .status(200)
       .json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.header('Content-Type', 'application/json')
       .status(500)
       .json({ success: false, message: error.message || "Internal server error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem({
      ...req.body,
      restaurantId: req.restaurant._id
    });
    await menuItem.save();
    res.header('Content-Type', 'application/json')
       .status(201)
       .json({ success: true, data: menuItem });
  } catch (error) {
    console.error('Add Menu Item Error:', error);
    res.header('Content-Type', 'application/json')
       .status(500)
       .json({ success: false, message: error.message || "Internal server error" });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.restaurant._id });
    res.header('Content-Type', 'application/json')
       .status(200)
       .json({ success: true, data: menuItems });
  } catch (error) {
    console.error('Get Menu Items Error:', error);
    res.header('Content-Type', 'application/json')
       .status(500)
       .json({ success: false, message: error.message || "Internal server error" });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findOneAndUpdate(
      { _id: req.params.id, restaurantId: req.restaurant._id },
      req.body,
      { new: true }
    );
    if (!menuItem) {
      return res.header('Content-Type', 'application/json')
                .status(404)
                .json({ success: false, message: "Item not found" });
    }
    res.header('Content-Type', 'application/json')
       .status(200)
       .json({ success: true, data: menuItem });
  } catch (error) {
    console.error('Update Menu Item Error:', error);
    res.header('Content-Type', 'application/json')
       .status(500)
       .json({ success: false, message: error.message || "Internal server error" });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findOneAndDelete({
      _id: req.params.id,
      restaurantId: req.restaurant._id
    });
    if (!menuItem) {
      return res.header('Content-Type', 'application/json')
                .status(404)
                .json({ success: false, message: "Item not found" });
    }
    res.header('Content-Type', 'application/json')
       .status(200)
       .json({ success: true, data: menuItem });
  } catch (error) {
    console.error('Delete Menu Item Error:', error);
    res.header('Content-Type', 'application/json')
       .status(500)
       .json({ success: false, message: error.message || "Internal server error" });
  }
};

module.exports = {
  updateRestaurantStatus,
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
};
