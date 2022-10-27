"use strict";

//Display products on screen -------------------------------------------
function displayProducts(products) {
  products.forEach(function (productsIndex) {
    var catchId = document.getElementById('items'); //create different elements html

    var createLink = document.createElement('a');
    createLink.href = './product.html?id=' + productsIndex._id;
    var createArticle = document.createElement('article');
    var createImg = document.createElement('img');
    createImg.src = productsIndex.imageUrl;
    var createName = document.createElement('h3');
    var createDescription = document.createElement('p'); //insert the array element in DOM

    createImg.innerHTML = productsIndex.imageURL;
    createName.innerHTML = productsIndex.name;
    createDescription.innerHTML = productsIndex.description; //display the Markup element at his parents

    catchId.appendChild(createLink);
    createLink.appendChild(createArticle);
    createArticle.appendChild(createImg);
    createArticle.appendChild(createName);
    createArticle.appendChild(createDescription);
  });
} //Return API-----------------------------------------------------


function main() {
  var products;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getData('http://localhost:3000/api/products'));

        case 2:
          products = _context.sent;
          displayProducts(products);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();