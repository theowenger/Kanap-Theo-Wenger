//get the different Data on the URL
async function getData(url) {
    return await fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw "Ce produit n'existe pas, vous serez rediriger vers la page d'acceuil";
        })
        .catch(function (error) {
            alert(error);
            window.location.href = "./index.html"
        })
}
//Save the value on the local Storage
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
//Load since the local Storage on the markup
function loadBasket(key) {
    const store = localStorage.getItem(key);
    if (store === null) {
        return [];
    } else {
        return JSON.parse(store);
    }
}