"use strict";

//Get URL and catch Only character after ID to have the valid ID to get on back
var querryString_url_id = window.location.search;
var searchParams = new URLSearchParams(querryString_url_id);
var currentIdOnPage = searchParams.get('id'); //Get Element By Id on Page------------------------------------------------------------

var getNameOfProduct = document.getElementById('title');
var getImgContainerOfProduct = document.getElementsByClassName('item__img').item(0);
var getPriceOfProduct = document.getElementById('price');
var getDescriptionOfProduct = document.getElementById('description');
var getColorsContainerOfProduct = document.getElementById('colors');
var getQuantityOfProduct = document.getElementById('quantity'); //Put Element of products in each ID or Class of the product.html page

function displayProductsOnPage(products) {
  getNameOfProduct.innerHTML = products.name;
  getPriceOfProduct.innerHTML = money(products.price);
  getDescriptionOfProduct.innerHTML = products.description;
} //Create IMG---------------------------------------------------------------------


function displayImgOnPage(products) {
  var createImg = document.createElement('img');
  getImgContainerOfProduct.appendChild(createImg);
  createImg.src = products.imageUrl;
  createImg.alt = products.altTxt;
  createImg.setAttribute('id', 'imgId');
  getImg = document.getElementById('imgId').src;
} //Insert Colors of product into the <select> tagname----------------------------------


function displayColorsOnPage(products) {
  for (var colors in products.colors) {
    var createColor = document.createElement('option');
    createColor.innerHTML = products.colors[colors];
    createColor.value = products.colors[colors];
    getColorsContainerOfProduct.appendChild(createColor);
  }
} //Call the 3 display Function------------------------------------------------------------------------


function displayProduct(product) {
  displayProductsOnPage(product);
  displayImgOnPage(product);
  displayColorsOnPage(product);
} // Basket management


var arrayBasket = [];

function addToBasket(productCommand) {
  // productCommand {id, color, quantity}
  //Si on veut ajouter un element au tableau arraybasket, recuperer l'objet et les inplementer à la suite.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrayBasket[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var command = _step.value;

      if (command._id === productCommand._id && command.color === productCommand.color) {
        //Le produit demandé existe deja dans le panier
        command.quantity += productCommand.quantity;
        save('cart', arrayBasket);
        return;
      }
    } // ajouter un objet du clik dans le tableau arraybasket

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  arrayBasket.push(productCommand); //trier le tableau et regroupe les elements par ID

  arrayBasket.sort(function compare(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    return 0;
  });
  save('cart', arrayBasket);
} //Create array with the different products selected when you click on button


var buttonBasket = document.getElementById('addToCart');
buttonBasket.addEventListener('click', function _callee() {
  var products, productCommand, i;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products/' + currentIdOnPage));

        case 2:
          products = _context.sent;
          productCommand = {
            _id: currentIdOnPage,
            color: getColorsContainerOfProduct.options[getColorsContainerOfProduct.selectedIndex].value,
            quantity: parseInt(getQuantityOfProduct.value)
          };

          if (!(productCommand.color === "")) {
            _context.next = 7;
            break;
          }

          alert('veuillez choisir une couleur');
          return _context.abrupt("return");

        case 7:
          if (!(productCommand.quantity < 1 || productCommand.quantity > 99)) {
            _context.next = 10;
            break;
          }

          alert('veuillez choisir une quantitée entre 1 et 99');
          return _context.abrupt("return");

        case 10:
          _context.t0 = regeneratorRuntime.keys(products.colors);

        case 11:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 19;
            break;
          }

          i = _context.t1.value;

          if (!(productCommand.color === products.colors[i])) {
            _context.next = 17;
            break;
          }

          addToBasket(productCommand);
          alert('votre produit est ajouté au panier');
          return _context.abrupt("return");

        case 17:
          _context.next = 11;
          break;

        case 19:
          alert('la couleur selectionnée n\'existe pas');

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Insert arrayBasket into the local storage
//Get The object of the Kanap Clicked. Then Call the differents functions created-----------------------

function main() {
  var products;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          arrayBasket = loadBasket('cart');
          _context2.next = 3;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products/' + currentIdOnPage));

        case 3:
          products = _context2.sent;
          console.log(products);
          displayProduct(products);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main();