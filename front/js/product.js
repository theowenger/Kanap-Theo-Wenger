
const querryString_url_id = window.location.search;
const searchParams = new URLSearchParams(querryString_url_id);
const currentIdOnPage = searchParams.get('id');
console.log(currentIdOnPage);

//Get Element By Id on Page------------------------------------------------------------

const getNameOfProduct = document.getElementById('title');
const getImgContainerOfProduct = document.getElementsByClassName('item__img').item(0);
const getPriceOfProduct = document.getElementById('price');
const getDescriptionOfProduct = document.getElementById('description');
const getColorsContainerOfProduct = document.getElementById('colors');
const getQuantityOfProduct = document.getElementById('quantity');


//Put Element of products in each ID or Class of the product.html page
function displayProductsOnPage(products) {
    getNameOfProduct.innerHTML = products.name;
    getPriceOfProduct.innerHTML = products.price;
    getDescriptionOfProduct.innerHTML = products.description;
}

//Create IMG---------------------------------------------------------------------
function displayImgOnPage(products) {

    const createImg = document.createElement('img');
    getImgContainerOfProduct.appendChild(createImg);
    createImg.src = products.imageUrl;
    createImg.alt = products.altTxt;
    createImg.setAttribute('id', 'imgId');
    getImg = document.getElementById('imgId').src;
}

//Insert Colors of product into the <select> tagname----------------------------------
function displayColorsOnPage(products) {
    for (const colors in products.colors) {
        const createColor = document.createElement('option');
        createColor.innerHTML = products.colors[colors];
        createColor.value = products.colors[colors];
        getColorsContainerOfProduct.appendChild(createColor);
    }
}

function displayProduct(product) {
    displayProductsOnPage(product)
    displayImgOnPage(product)
    displayColorsOnPage(product)
}


// Basket management
let arrayBasket = []

function addToBasket(productCommand) {
    // productCommand {id, color, quantity}
    //Si on veut ajouter un element au tableau arraybasket, recuperer l'objet et les inplementer à la suite.
    for (const command of arrayBasket) {
        if (command._id === productCommand._id && command.color === productCommand.color) {
            //Le produit demandé existe deja dans le panier
            command.quantity += productCommand.quantity;
            save('cart', arrayBasket);
            return;
        }
    }

    // ajouter un objet du clik dans le tableau arraybasket

    arrayBasket.push(productCommand);

    //trier le tableau et regroupe les elements par ID
    arrayBasket.sort(function compare(a, b) {
        if (a._id < b._id)
           return -1;
        if (a._id > b._id )
           return 1;
        return 0;
    });
    save('cart', arrayBasket);

}



//Create array with the different products selected when you click on button

const buttonBasket = document.getElementById('addToCart')

buttonBasket.addEventListener('click', function () {

    const productCommand = {
        _id: currentIdOnPage,
        color: getColorsContainerOfProduct.options[getColorsContainerOfProduct.selectedIndex].value,
        quantity: parseInt(getQuantityOfProduct.value),
    }
    if(productCommand.color === "") {
        alert('veuillez choisir une couleur');
        return
    }
    if(productCommand.quantity < 1 || productCommand.quantity > 99) {
        alert('veuillez choisir une quantitée entre 1 et 99');
        return
    }
    addToBasket(productCommand)
    alert('votre produit est ajouté au panier')
    console.log(arrayBasket);

});

//Insert arrayBasket into the local storage


//Get The object of the Kanap Clicked. Then Call the differents functions created-----------------------
async function main() {
    arrayBasket = loadBasket('cart')
    const products = await getData('http://localhost:3000/api/products/' + currentIdOnPage)
    //console.log(products)
    displayProduct(products)
}
main()
