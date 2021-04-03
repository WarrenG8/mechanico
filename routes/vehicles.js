const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const Vehicle = require('../models/Vehicle');

/**
 * Serves vehicle add page
 * @name get/vehicles/add
 * @function
 * @memberof module:routers/vehicles/add
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/add', ensureAuth, (req, res) => {
  res.render('vehicles/add');
});

/**
 * Creates a vehicle
 * @name post/vehicles/
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Vehicle.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

/**
 * Shows all vehicles
 * @name get/vehicles/
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ensureAuth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('vehicles/index', {
      vehicles,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
})

/**
 * Shows a single vehicle
 * @name get/vehicles/:id
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('user').lean();

    if (!vehicle || vehicle.user._id != req.user.id) {
      return res.render('error/404');
    }

    res.render('vehicles/repairTypes', {
      vehicle,
    });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
})

/**
 * Shows edit page
 * @name get/vehicles/edit/:id
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id,
    }).lean();

    if (!vehicle) {
      return res.render('error/404');
    }

    if (vehicle.user != req.user.id) {
      return res.redirect('/vehicles');
    }

    res.render('vehicles/edit', {
      vehicle,
    });
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
})

/**
 * Updates vehicle
 * @name put/vehicles/:id
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean()

    if (!vehicle) {
      return res.render('error/404');
    }

    if (vehicle.user != req.user.id) {
      return res.redirect('/vehicles');
    }

    await Vehicle.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/dashboard');

  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
})

/**
 * Deletes vehicle
 * @name delete/vehicles/:id
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean();

    if (!vehicle) {
      return res.render('error/404');
    }

    if (vehicle.user != req.user.id) {
      return res.redirect('/vehicles');
    } 

    await Vehicle.remove({ _id: req.params.id });
    res.redirect('/dashboard');
    
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
})

/**
 * Gets user vehicles
 * @name get/vehicles/user/:userId
 * @function
 * @memberof module:routers/vehicles
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      user: req.params.userId,
    })
      .populate('user')
      .lean();

    res.render('vehicles/index', {
      vehicles,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
})

module.exports = router;
