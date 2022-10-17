"use strict";

var querryString_url_id = window.location.search;
var searchParams = new URLSearchParams(querryString_url_id);
var currentIdOnPage = searchParams.get('id');
console.log(currentIdOnPage); //Get Element By Id on Page------------------------------------------------------------

var getNameOfProduct = document.getElementById('title');
var getImgContainerOfProduct = document.getElementsByClassName('item__img').item(0);
var getPriceOfProduct = document.getElementById('price');
var getDescriptionOfProduct = document.getElementById('description');
var getColorsContainerOfProduct = document.getElementById('colors');
var getQuantityOfProduct = document.getElementById('quantity'); //Put Element of products in each ID or Class of the product.html page

function displayProductsOnPage(products) {
  getNameOfProduct.innerHTML = products.name;
  getPriceOfProduct.innerHTML = products.price;
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
}

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
buttonBasket.addEventListener('click', function () {
  var productCommand = {
    _id: currentIdOnPage,
    color: getColorsContainerOfProduct.options[getColorsContainerOfProduct.selectedIndex].value,
    quantity: parseInt(getQuantityOfProduct.value)
  };

  if (productCommand.color === "") {
    alert('veuillez choisir une couleur');
    return;
  }

  if (productCommand.quantity < 1 || productCommand.quantity > 99) {
    alert('veuillez choisir une quantitée entre 1 et 99');
    return;
  }

  addToBasket(productCommand);
  alert('votre produit est ajouté au panier');
  console.log(arrayBasket);
}); //Insert arrayBasket into the local storage
//Get The object of the Kanap Clicked. Then Call the differents functions created-----------------------

function main() {
  var products;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          arrayBasket = loadBasket('cart');
          _context.next = 3;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products/' + currentIdOnPage));

        case 3:
          products = _context.sent;
          //console.log(products)
          displayProduct(products);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();