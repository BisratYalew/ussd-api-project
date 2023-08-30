const menuData = require('../data/menus');

// Default Initial state is 'welcome'
const builder = (state="welcome") => {
    return menuData[state];
}

module.exports = {
    builder
}