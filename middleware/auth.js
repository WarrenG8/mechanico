

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  
  res.redirect('/');
}

function ensureGuest (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } 
    
  res.redirect('/dashboard');
}

module.exports = {
  ensureAuth,
  ensureGuest,
};
