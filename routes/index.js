const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');

const Vehicle = require('../models/Vehicle');

/**
 * Serves login page
 * @name get/
 * @function
 * @memberof module:routers/index
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

/**
 * Serves Dashboard page
 * @name get/dashboard
 * @function
 * @memberof module:routers/index
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      vehicles,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
})

module.exports = router;
