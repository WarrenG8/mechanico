const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const {get} = require('axios');
const Vehicle = require('../models/Vehicle');
const {YOUTUBE_KEY, YOUTUBE_URL} = process.env;

/**
 * Route serving links of YouTube videos based on car and repair type.
 * @name get/:id
 * @function
 * @memberof module:routers/repairVideos
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    console.log(req.params);
    const vehicle = await Vehicle.findById(req.params.id).lean();

    if (!vehicle || vehicle.user._id != req.user.id) {
      return res.render('error/404');
    }

    const youTubeLinks = await getYoutubeLinks(vehicle, req.query);

    res.render('repairVideos/links', {
      vehicle,
      youTubeLinks
    });
    
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
});

/**
 * Route serving links of YouTube videos based on car and repair type.
 * @name get/repairVideos/:vehicleId/watch/:videoId
 * @function
 * @memberof module:routers/repairVideos
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
 router.get('/watchVideo/:videoId/:title', ensureAuth, async (req, res) => {
  try {
    const {title,videoId} = req.params;
    res.render('repairVideos/player', {title, videoId});
    
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
});

/**
 * Gets YouTube links for car repairs based on vehicle year, make,
 * and model and repair type
 * @function getYoutubeLinks
 * @param {object} vehicle - vehicle year, make, and model.
 * @param {object} repair - type of repair
 */
async function getYoutubeLinks({year, make, model}, {repair}) {
  console.log(`${year} ${make} ${model} ${repair}`);
  const links = await get(YOUTUBE_URL,  {
    params: {
      q: `${year} ${make} ${model} ${repair} repair`,
      part: 'snippet',
      maxResults: 10,
      key: YOUTUBE_KEY,
    }
  });
  return links.data.items;
}

module.exports = router;
