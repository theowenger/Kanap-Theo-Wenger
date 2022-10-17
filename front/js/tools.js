
async function getData(url) {
    return await fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw "Ce produit n'existe pas";
        })
        .catch(function (error) {
            alert(error);
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