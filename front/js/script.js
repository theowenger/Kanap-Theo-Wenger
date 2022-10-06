
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
        .catch(function(error) {
            console.error(error);
        })
}

//Affiche les produits à l'ecran -------------------------------------------
function displayProducts(products) {
    for (let i = 0; i < products.length; i++) {
        const productsIndex = products[i];

        const catchId = document.getElementById('items');

//creer les differents elements html

        const createLink = document.createElement('a');      
        createLink.href = './product.html?id=' + productsIndex._id;  
        const createArticle = document.createElement('article');
        const createImg = document.createElement('img');
        createImg.src = productsIndex.imageUrl;
        const createName = document.createElement('h3');
        const createDescription = document.createElement('p');


//inserer dynamiquement les elements du tableau dans le html

        createImg.innerHTML = productsIndex.imageURL;
        createName.innerHTML = productsIndex.name;
        createDescription.innerHTML = productsIndex.description;


//integrer les elements HTML à leurs parents

        catchId.appendChild(createLink)
        createLink.appendChild(createArticle);
        createArticle.appendChild(createImg);
        createArticle.appendChild(createName);
        createArticle.appendChild(createDescription);

        // console.log(createLink)
    }
}

//afficher sur la page web des produits -----------------------------------


function displayOnProductsPage(product) {
    for (let i = 0; i < products.length; i++) {
        const productsIndex = products[i];

  
    }
    
}


//Retourne l'API-----------------------------------------------------


async function main() {
    const products = await returnFetch('http://localhost:3000/api/products')
    displayProducts(products)
}
main()