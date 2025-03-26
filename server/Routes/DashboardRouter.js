const router = require('express').Router();
const {
  updateRestaurantStatus,
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
} = require('../Controllers/DashboardController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.use(authMiddleware);

router.put('/restaurant/status', updateRestaurantStatus);
router.get('/menu-items', getMenuItems);
router.post('/menu-items', addMenuItem);
router.put('/menu-items/:id', updateMenuItem);
router.delete('/menu-items/:id', deleteMenuItem);

module.exports = router;
