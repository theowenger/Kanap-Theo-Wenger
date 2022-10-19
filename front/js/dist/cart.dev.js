"use strict";

var store = loadBasket('cart');
var getTotalPrice = document.getElementById('totalPrice');
var getTotalQuantity = document.getElementById('totalQuantity');

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
};

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
}

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
}

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
}

function getUserCommand() {
  var getUserForm = document.getElementsByTagName('form'); // getUserForm.('confirmation.html')

  var getFirstName = document.getElementById('firstName');
  var getLastName = document.getElementById('lastName');
  var getAddress = document.getElementById('address');
  var getCity = document.getElementById('city');
  var getEmail = document.getElementById('email');
  var getButtonCommand = document.getElementById('order');
  getButtonCommand.addEventListener('click', function (e) {
    var userList = {
      firstName: getFirstName.value,
      lastName: getLastName.value,
      address: getAddress.value,
      city: getCity.value,
      mail: getEmail.value
    };
    e.preventDefault;
    console.log(userList);
    console.log(e);
    save('user', userList);
  });
}

function main() {
  var allProducts, products;
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loadBasket("cart");
          _context2.next = 3;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products'));

        case 3:
          allProducts = _context2.sent;
          products = buildCompleteList(store, allProducts);
          displayBasket(products);
          listenToDeleteButton(products);
          listenToChangeQuantity(products);
          displayTotalPrice(products);
          getUserCommand();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main();