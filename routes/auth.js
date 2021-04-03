const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * Authorizes with Google
 * @name get/auth/google
 * @function
 * @memberof module:routers/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * Redirects Google Auth callback
 * @name get/auth/google/callback
 * @function
 * @memberof module:routers/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
);

/**
 * Logout Google Auth callback
 * @name get/auth/logout
 * @function
 * @memberof module:routers/auth
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});

module.exports = router;
