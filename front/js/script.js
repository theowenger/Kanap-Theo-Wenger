

//Display products on screen -------------------------------------------
function displayProducts(products) {
    products.forEach(productsIndex => {
        const catchId = document.getElementById('items');

        //create different elements html

        const createLink = document.createElement('a');
        createLink.href = './product.html?id=' + productsIndex._id;
        const createArticle = document.createElement('article');
        const createImg = document.createElement('img');
        createImg.src = productsIndex.imageUrl;
        const createName = document.createElement('h3');
        const createDescription = document.createElement('p');


        //insert the array element in DOM

        createImg.innerHTML = productsIndex.imageURL;
        createName.innerHTML = productsIndex.name;
        createDescription.innerHTML = productsIndex.description;


        //display the Markup element at his parents

        catchId.appendChild(createLink)
        createLink.appendChild(createArticle);
        createArticle.appendChild(createImg);
        createArticle.appendChild(createName);
        createArticle.appendChild(createDescription);
    });
}


//Return API-----------------------------------------------------


async function main() {
    const products = await getData('http://localhost:3000/api/products')
    displayProducts(products)
}
main()