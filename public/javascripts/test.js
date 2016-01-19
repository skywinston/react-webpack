require('../stylesheets/styleguide.scss');

module.exports = function () {
    var element = document.createElement('h1');

    element.innerHTML = "Hello, Sky!";

    return element;
};