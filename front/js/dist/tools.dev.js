"use strict";

//get the different Data on the URL
function getData(url) {
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url).then(function (response) {
            if (response.ok) {
              return response.json();
            }

            throw "Ce produit n'existe pas, vous serez rediriger vers la page d'acceuil";
          })["catch"](function (error) {
            alert(error);
            window.location.href = "./index.html";
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
} //Save the value on the local Storage


function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
} //Load since the local Storage on the markup


function loadBasket(key) {
  var store = localStorage.getItem(key);

  if (store === null) {
    return [];
  } else {
    return JSON.parse(store);
  }
}