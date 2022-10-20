
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

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadBasket(key) {
    const store = localStorage.getItem(key);
    if (store === null) {
        return [];
    } else {
        return JSON.parse(store);
    }
}