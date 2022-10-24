"use strict";

//Get the localStorage and catch Price and quantity
var store = loadBasket('cart');
var getTotalPrice = document.getElementById('totalPrice');
var getTotalQuantity = document.getElementById('totalQuantity'); //Display all the index of Local Storage

var displayBasket = function displayBasket(products) {
  return regeneratorRuntime.async(function displayBasket$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          products.forEach(function (element) {
            //Create each element of the basket and give it a className
            var createArticle = document.createElement('article');
            createArticle.classList.add('cart__item');
            createArticle.setAttribute('id', element._id);
            createArticle.setAttribute('color', element.color);
            var createDivImg = document.createElement('div');
            createDivImg.classList.add('cart__item__img');
            var createImg = document.createElement('img');
            var createDivItem = document.createElement('div');
            createDivItem.classList.add('cart__item__content');
            var createDivItemDescription = document.createElement('div');
            createDivItemDescription.classList.add('cart__item__content__description');
            var createH2 = document.createElement('h2');
            var createPColor = document.createElement('p');
            var createPPrice = document.createElement('p');
            createH2.innerHTML = element.name;
            createPColor.innerHTML = element.color;
            createPPrice.innerHTML = element.price + ",00 €";
            createImg.src = element.imageUrl;
            var createDivItemSetting = document.createElement('div');
            createDivItemSetting.classList.add('cart__item__content__settings');
            var createDivItemSettingQuantity = document.createElement('div');
            createDivItemSettingQuantity.classList.add('cart__item__content__settings__quantity');
            var createPQuantity = document.createElement('p');
            var createInput = document.createElement('input');
            createInput.type = 'number';
            createInput.classList.add('itemQuantity');
            createInput.name = 'itemQuantity';
            createInput.min = '1';
            createInput.max = '100';
            createPQuantity.innerHTML = "Qté :";
            createInput.setAttribute('value', element.quantity);
            var createDivItemDelete = document.createElement('div');
            createDivItemDelete.classList.add('cart__item__content__settings__delete');
            var createPDelete = document.createElement('p');
            createPDelete.classList.add('deleteItem');
            createPDelete.innerText = 'Supprimer'; //Ratacher les elements au Dom

            var getSection = document.getElementById('cart__items');
            getSection.appendChild(createArticle);
            createArticle.appendChild(createDivImg);
            createDivImg.appendChild(createImg);
            createArticle.appendChild(createDivItem);
            createDivItem.appendChild(createDivItemDescription);
            createDivItemDescription.appendChild(createH2);
            createDivItemDescription.appendChild(createPColor);
            createDivItemDescription.appendChild(createPPrice);
            createDivItem.appendChild(createDivItemSetting);
            createDivItemSetting.appendChild(createDivItemSettingQuantity);
            createDivItemSettingQuantity.appendChild(createPQuantity);
            createDivItemSettingQuantity.appendChild(createInput);
            createDivItemSetting.appendChild(createDivItemDelete);
            createDivItemDelete.appendChild(createPDelete);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Get 2 array: LocalStorage and Products API and join in a new array call List


function buildCompleteList(productsStore, productsApi) {
  var list = [];
  productsStore.forEach(function (productStore) {
    productsApi.forEach(function (productApi) {
      if (productStore._id === productApi._id) {
        list.push({
          _id: productStore._id,
          name: productApi.name,
          price: productApi.price,
          quantity: productStore.quantity,
          color: productStore.color,
          altTxt: productApi.altTxt,
          imageUrl: productApi.imageUrl
        });
      }
    });
  });
  return list;
} // //display total price In DOM


function displayTotalPrice(list) {
  var totalPrice = 0;
  var totalQuantity = 0;

  for (var i = 0; i < list.length; i++) {
    var price = list[i].price;
    var quantity = list[i].quantity;
    totalPrice += price * quantity;
    totalQuantity += quantity;
    getTotalPrice.innerHTML = totalPrice;
    getTotalQuantity.innerHTML = totalQuantity;
  }
} //listen the delete Button and delete the product of DOM


function listenToDeleteButton(products) {
  var deleteButton = document.querySelectorAll('.deleteItem');

  var _loop = function _loop(i) {
    deleteButton[i].addEventListener('click', function (e) {
      var article = e.target.closest('article');
      var color = article.getAttribute('color');
      var id = article.getAttribute('id');

      if (!confirm('Voulez vous supprimer l\'article?')) {
        return;
      }

      var updateStore = store.filter(function (p) {
        return p._id !== id || p.color !== color;
      });
      save('cart', updateStore);
      getTotalPrice.innerHTML -= products[i].quantity * products[i].price;
      getTotalQuantity.innerHTML -= products[i].quantity;
      article.remove();
      window.location.reload();
    });
  };

  for (var i = 0; i < products.length; i++) {
    _loop(i);
  }
} //Listen the input quantity and modify in DOM and in LocalStorage


function listenToChangeQuantity(products) {
  var itemsQuantity = document.querySelectorAll('.itemQuantity');

  var _loop2 = function _loop2(i) {
    itemsQuantity[i].addEventListener('change', function (e) {
      if (e.target.value > 100 || e.target.value < 1) {
        alert('Veuillez selectionner entre 1 et 100 articles');
        store = loadBasket('cart');
        e.target.value = store[i].quantity;
        return;
      }

      store = loadBasket('cart');
      e.preventDefault;
      products[i].quantity = Number(e.target.value);
      store[i].quantity = Number(e.target.value);
      itemsQuantity[i].setAttribute('value', e.target.value);
      displayTotalPrice(products);
      save('cart', store);
    });
  };

  for (var i = 0; i < itemsQuantity.length; i++) {
    _loop2(i);
  }
} //Listen all the form value and send to the confirmation page in a new array named Payload


function getUserCommand() {
  var firstNameInput = document.getElementById('firstName');
  var lastNameInput = document.getElementById('lastName');
  var addressInput = document.getElementById('address');
  var cityInput = document.getElementById('city');
  var emailInput = document.getElementById('email');
  var buttonCommandInput = document.getElementById('order').addEventListener('click', function _callee(e) {
    var payload, result, orderId;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            hideError(firstNameInput);
            hideError(lastNameInput);
            hideError(addressInput);
            hideError(cityInput);
            hideError(emailInput);

            if (isFirstNameValid(firstNameInput.value)) {
              _context2.next = 9;
              break;
            }

            showError(firstNameInput, 'merci de renseigner un prenom valide');
            return _context2.abrupt("return");

          case 9:
            if (isLasttNameValid(lastNameInput.value)) {
              _context2.next = 12;
              break;
            }

            showError(lastNameInput, 'merci de renseigner un nom valide');
            return _context2.abrupt("return");

          case 12:
            if (isAddressValid(addressInput.value)) {
              _context2.next = 15;
              break;
            }

            showError(addressInput, 'merci de renseigner une adresse valide');
            return _context2.abrupt("return");

          case 15:
            if (isCityValid(cityInput.value)) {
              _context2.next = 18;
              break;
            }

            showError(cityInput, 'merci de renseigner un nom de ville valide');
            return _context2.abrupt("return");

          case 18:
            if (isEmailValid(emailInput.value)) {
              _context2.next = 21;
              break;
            }

            showError(emailInput, 'merci de renseigner une adresse mail valide');
            return _context2.abrupt("return");

          case 21:
            payload = {
              contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value
              },
              products: store.map(function (a) {
                return a._id;
              })
            };
            _context2.next = 24;
            return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/products/order', {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            }).then(function (response) {
              if (response.ok) {
                return response.json();
              }
            }));

          case 24:
            result = _context2.sent;
            orderId = result.orderId;
            location.href = "./confirmation.html?order=".concat(orderId);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
} //display an error message if wrong


function showError(element, message) {
  var errorElement = element.nextElementSibling;
  errorElement.innerText = message;
}

function hideError(element) {
  var errorElement = element.nextElementSibling;
  errorElement.innerText = '';
} //Function who's search in the value of form all the prohibited character and return an alert


function isFirstNameValid(firstName) {
  if (firstName.trim(' ').length < 3) {
    alert('veuillez selectionner au moins trois caractères');
    return;
  }

  var pattern = /^[_A-zÀ-ÿ]*((-|\s)*[_A-zÀ-ÿ])*$/;
  return pattern.test(firstName);
}

function isLasttNameValid(lastName) {
  if (lastName.trim(' ').length < 3) {
    alert('veuillez selectionner au moins trois caractères');
    return;
  }

  var pattern = /^[_A-zÀ-ÿ]*((-|\s)*[_A-zÀ-ÿ])*$/;
  return pattern.test(lastName);
}

function isAddressValid(address) {
  if (address.trim(' ').length < 3) {
    alert('veuillez selectionner au moins trois caractères');
    return;
  }

  var pattern = /^[_A-zÀ-ÿ0-9]*((-|\s)*[_A-zÀ-ÿ0-9])*$/;
  return pattern.test(address);
}

function isCityValid(city) {
  if (city.trim(' ').length < 3) {
    alert('veuillez selectionner au moins trois caractères');
    return;
  }

  var pattern = /^[_A-zÀ-ÿ]*((-|\s)*[_A-zÀ-ÿ])*$/;
  return pattern.test(city);
}

function isEmailValid(email) {
  var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return pattern.test(email);
} //main Function call all the function necessary on the load page


function main() {
  var allProducts, products;
  return regeneratorRuntime.async(function main$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          loadBasket("cart");
          _context3.next = 3;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products'));

        case 3:
          allProducts = _context3.sent;
          products = buildCompleteList(store, allProducts);
          displayBasket(products);
          listenToDeleteButton(products);
          listenToChangeQuantity(products);
          displayTotalPrice(products);
          getUserCommand();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}

main();