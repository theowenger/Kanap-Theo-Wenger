let store = loadBasket('cart');
const getTotalPrice = document.getElementById('totalPrice')
const getTotalQuantity = document.getElementById('totalQuantity')


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
        createPPrice.innerHTML = element.price + ",00 €";
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
        createPQuantity.innerHTML = "Qté :"
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
    for (let i = 0; i < list.length; i++) {
        const price = list[i].price;
        const quantity = list[i].quantity
        totalPrice += price * quantity
        totalQuantity += quantity
        getTotalPrice.innerHTML = totalPrice
        getTotalQuantity.innerHTML = totalQuantity
    }
}



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
            getTotalPrice.innerHTML -= products[i].quantity * products[i].price
            getTotalQuantity.innerHTML -= products[i].quantity
            article.remove();
            window.location.reload()
        })
    }
}

function listenToChangeQuantity(products) {

    const itemsQuantity = document.querySelectorAll('.itemQuantity')

    for (let i = 0; i < itemsQuantity.length; i++) {

        itemsQuantity[i].addEventListener('change', (e) => {
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

async function main() {
    loadBasket("cart");
    const allProducts = await getData('http://localhost:3000/api/products')

    const products = buildCompleteList(store, allProducts);
    displayBasket(products)
    listenToDeleteButton(products)
    listenToChangeQuantity(products)
    displayTotalPrice(products)
}
main()
