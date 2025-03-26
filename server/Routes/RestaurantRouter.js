const router = require('express').Router();
const Restaurant = require('../Models/Restaurant');
const MenuItem = require('../Models/MenuItem'); // Import MenuItem model

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
});

// GET route to fetch menu items for a specific restaurant
router.get('/:restaurantId/menu', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menuItems = await MenuItem.find({ restaurantId: restaurantId });
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

module.exports = router;
