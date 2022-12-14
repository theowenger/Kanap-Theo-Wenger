//Get the localStorage and catch Price and quantity

let store = loadBasket('cart');
const getTotalPrice = document.getElementById('totalPrice')
const getTotalQuantity = document.getElementById('totalQuantity')

//Display all the index of Local Storage
const displayBasket = async (products) => {
    products.forEach(element => {
        //Create each element of the basket and give it a className
        const createArticle = document.createElement('article');
        createArticle.classList.add('cart__item');
        createArticle.setAttribute('id', element._id);
        createArticle.setAttribute('color', element.color);
        const createDivImg = document.createElement('div');
        createDivImg.classList.add('cart__item__img')
        const createImg = document.createElement('img');
        const createDivItem = document.createElement('div');
        createDivItem.classList.add('cart__item__content');
        const createDivItemDescription = document.createElement('div');
        createDivItemDescription.classList.add('cart__item__content__description');

        const createH2 = document.createElement('h2');
        const createPColor = document.createElement('p');
        const createPPrice = document.createElement('p');

        createH2.innerHTML = element.name;
        createPColor.innerHTML = element.color;
        createPPrice.innerHTML = money(element.price);
        createImg.src = element.imageUrl;



        const createDivItemSetting = document.createElement('div');
        createDivItemSetting.classList.add('cart__item__content__settings')
        const createDivItemSettingQuantity = document.createElement('div');
        createDivItemSettingQuantity.classList.add('cart__item__content__settings__quantity');
        const createPQuantity = document.createElement('p');
        const createInput = document.createElement('input');
        createInput.type = 'number';
        createInput.classList.add('itemQuantity');
        createInput.name = 'itemQuantity';
        createInput.min = '1';
        createInput.max = '100';
        createPQuantity.innerHTML = "Qt?? :"
        createInput.setAttribute('value', element.quantity);

        const createDivItemDelete = document.createElement('div');
        createDivItemDelete.classList.add('cart__item__content__settings__delete');
        const createPDelete = document.createElement('p');
        createPDelete.classList.add('deleteItem');
        createPDelete.innerText = 'Supprimer';

        //Ratacher les elements au Dom

        const getSection = document.getElementById('cart__items');
        getSection.appendChild(createArticle);
        createArticle.appendChild(createDivImg)
        createDivImg.appendChild(createImg)
        createArticle.appendChild(createDivItem)
        createDivItem.appendChild(createDivItemDescription)
        createDivItemDescription.appendChild(createH2)
        createDivItemDescription.appendChild(createPColor)
        createDivItemDescription.appendChild(createPPrice)
        createDivItem.appendChild(createDivItemSetting)
        createDivItemSetting.appendChild(createDivItemSettingQuantity)
        createDivItemSettingQuantity.appendChild(createPQuantity)
        createDivItemSettingQuantity.appendChild(createInput)
        createDivItemSetting.appendChild(createDivItemDelete)
        createDivItemDelete.appendChild(createPDelete)
    })

};

//Get 2 array: LocalStorage and Products API and join in a new array call List
function buildCompleteList(productsStore, productsApi) {
    let list = []
    productsStore.forEach(productStore => {
        productsApi.forEach(productApi => {
            if (productStore._id === productApi._id) {
                list.push({
                    _id: productStore._id,
                    name: productApi.name,
                    price: productApi.price,
                    quantity: productStore.quantity,
                    color: productStore.color,
                    altTxt: productApi.altTxt,
                    imageUrl: productApi.imageUrl
                })
            }
        })
    });
    return list;
}


// //display total price In DOM
function displayTotalPrice(list) {
    let totalPrice = 0
    let totalQuantity = 0
    list.forEach(element => {
        const price = element.price;
        const quantity = element.quantity
        totalPrice += price * quantity
        totalQuantity += quantity
        getTotalPrice.innerHTML = money(totalPrice)
        getTotalQuantity.innerHTML = totalQuantity
    });
}


//listen the delete Button and delete the product of DOM
function listenToDeleteButton(products) {

    const deleteButton = document.querySelectorAll('.deleteItem')

    for (let i = 0; i < products.length; i++) {

        deleteButton[i].addEventListener('click', (e) => {
            const article = e.target.closest('article')
            const color = article.getAttribute('color')
            const id = article.getAttribute('id')
            if (!confirm('Voulez vous supprimer l\'article?')) {
                return
            }
            let updateStore = store.filter(p => p._id !== id || p.color !== color)
            save('cart', updateStore)
            // getTotalPrice.innerHTML -= products[i].quantity * products[i].price
            // getTotalQuantity.innerHTML -= products[i].quantity
            // article.remove();
            window.location.reload()
        })
    }
}
//Listen the input quantity and modify in DOM and in LocalStorage
function listenToChangeQuantity(products) {

    const itemsQuantity = document.querySelectorAll('.itemQuantity')

    for (let i = 0; i < itemsQuantity.length; i++) {

        itemsQuantity[i].addEventListener('change', (e) => {
            if (e.target.value > 100 || e.target.value < 1) {
                alert('Veuillez selectionner entre 1 et 100 articles')
                store = loadBasket('cart')
                e.target.value = store[i].quantity
                return
            }
            store = loadBasket('cart')
            e.preventDefault;
            products[i].quantity = Number(e.target.value);
            store[i].quantity = Number(e.target.value);
            itemsQuantity[i].setAttribute('value', e.target.value)
            displayTotalPrice(products)
            save('cart', store)
        })
    }
}



//Listen all the form value and send to the confirmation page in a new array named Payload
function getUserCommand(store) {
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const addressInput = document.getElementById('address')
    const cityInput = document.getElementById('city')
    const emailInput = document.getElementById('email')
    const buttonCommandInput = document.getElementById('order').addEventListener('click', async (e) => {
        e.preventDefault()
        hideError(firstNameInput)
        hideError(lastNameInput)
        hideError(addressInput)
        hideError(cityInput)
        hideError(emailInput)
        if (!isFirstNameValid(firstNameInput.value)) {
            showError(firstNameInput, 'merci de renseigner un prenom valide')
            return
        }
        if (!isLasttNameValid(lastNameInput.value)) {
            showError(lastNameInput, 'merci de renseigner un nom valide')
            return
        }
        if (!isAddressValid(addressInput.value)) {
            showError(addressInput, 'merci de renseigner une adresse valide')
            return
        }
        if (!isCityValid(cityInput.value)) {
            showError(cityInput, 'merci de renseigner un nom de ville valide')
            return
        }
        if (!isEmailValid(emailInput.value)) {
            showError(emailInput, 'merci de renseigner une adresse mail valide')
            return
        }
        if (store.length === 0) {
            alert('Votre panier est vide')
            return
        }

        let payload = {
            contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value,
            },
            products: store.map(a => a._id)
        }

        const result = await fetch('http://localhost:3000/api/products/order', {
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
        })
        const orderId = result.orderId;
        location.href = `./confirmation.html?order=${orderId}`
    })
}
//display an error message if wrong
function showError(element, message) {
    let errorElement = element.nextElementSibling
    errorElement.innerText = message;
}

function hideError(element) {
    let errorElement = element.nextElementSibling
    errorElement.innerText = '';
}

//Function who's search in the value of form all the prohibited character and return an alert
function isFirstNameValid(firstName) {
    if (firstName.trim(' ').length < 3) {
        alert('Erreur: veuillez vous reporter au formulaire')
        return
    }
    let pattern = /^[_A-z??-??]*((-|\s)*[_A-z??-??])*$/;
    return pattern.test(firstName)
}

function isLasttNameValid(lastName) {
    if (lastName.trim(' ').length < 3) {
        alert('Erreur: veuillez vous reporter au formulaire')
        return
    }
    let pattern = /^[_A-z??-??]*((-|\s)*[_A-z??-??])*$/;
    return pattern.test(lastName)
}

function isAddressValid(address) {
    if (address.trim(' ').length < 3) {
        alert('Erreur: veuillez vous reporter au formulaire')
        return
    }
    let pattern = /^[_A-z??-??0-9]*((-|\s)*[_A-z??-??0-9])*$/;
    return pattern.test(address)
}

function isCityValid(city) {
    if (city.trim(' ').length < 3) {
        alert('Erreur: veuillez vous reporter au formulaire')
        return
    }
    let pattern = /^[_A-z??-??]*((-|\s)*[_A-z??-??])*$/;
    return pattern.test(city)
}

function isEmailValid(email) {
    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return pattern.test(email)
}

function arrayIsEmpty() {
    //Hidde formulary
    const hiddenDiv = document.getElementsByClassName('cart__order__form').item(0)
    hiddenDiv.hidden = true;
    const totalIsEmpty = document.getElementsByClassName("cart__price").item(0)
    totalIsEmpty.hidden = true;

    //create a text who's say "the basket is empty"
    const getSection = document.getElementById('cart__items');
    const basketIsEmpty = document.createElement('div');

    basketIsEmpty.classList.add("cart__item")
    basketIsEmpty.style.fontSize = '2em'
    basketIsEmpty.innerHTML = 'Votre panier est vide'
    getSection.appendChild(basketIsEmpty);
}

//main Function call all the function necessary on the load page
async function main(store) {
    loadBasket("cart");
    const allProducts = await getData('http://localhost:3000/api/products')

    const products = buildCompleteList(store, allProducts);
    displayBasket(products)
    listenToDeleteButton(products)
    listenToChangeQuantity(products)
    displayTotalPrice(products)
    getUserCommand(store)
    console.log(store.length)
    //Check is Local Storage is Empty
    if (store.length === 0) {
        arrayIsEmpty()
        return
    }
}
main(store)
