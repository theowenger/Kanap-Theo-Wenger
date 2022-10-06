
async function returnFetch(url) {
    return await fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (products) {
            return products;
        })
        .catch(function (error) {
            console.error(error);
        })
}

const querryString_url_id = window.location.search;

//First way to find URL
// const currentId = querryString_url_id.slice(4);
// console.log(currentId);

//Second Way to fin URL

const searchParams = new URLSearchParams(querryString_url_id);
// console.log(searchParams);

const currentId = searchParams.get('id');
console.log(currentId);

//Utilisation de la methode .find()

function displayOnProductsPage(products) {
    const returnElementById = products.find((Element) => Element._id === currentId);


    //Display image on product page
    const findImg = document.getElementsByClassName('item__img').item(0);
    const createImg = document.createElement('img');
    createImg.src = returnElementById.imageUrl;
    createImg.alt = returnElementById.altTxt;
    findImg.appendChild(createImg);

    //Display title on product page
    const findName = document.getElementById('title');
    findName.innerHTML = returnElementById.name;

    //Display description on product page
    const findDescription = document.getElementById('description');
    findDescription.innerHTML = returnElementById.description;

    //Display price on product page
    const findPrice = document.getElementById('price');
    findPrice.innerHTML = returnElementById.price;

  //  Display colors on product page
    function addColor() {
        const findColors = document.getElementById('colors');

        //find each colors in products.color and apply to option
        for (const color in returnElementById.colors) {

            const createColor = document.createElement('option');
            createColor.innerHTML = returnElementById.colors[color];
            createColor.value = returnElementById.colors[color];

            findColors.appendChild(createColor);

        }
    }
    addColor()

}



async function main() {
    const products = await returnFetch('http://localhost:3000/api/products')
    displayOnProductsPage(products)

}
main()
