/**
 * Creates edit icon button
 * @function editIcon
 * @param {object} vehicleUser - vehicleUser obj
 * @param {object} loggedUser - loggedUser obj
 * @param {string} vehicleId - id of vehicle
 * @param {boolean} floating - floating
 */
function editIcon(vehicleUser, loggedUser, vehicleId, floating = true) {
  if (vehicleUser._id.toString() == loggedUser._id.toString()) {
    if (floating) {
      return `<a href="/vehicles/edit/${vehicleId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return `<a href="/vehicles/edit/${vehicleId}"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return '';
  }
};

module.exports = {editIcon};