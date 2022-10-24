//Get URL 
const querryString_url_id = window.location.search;
const searchParams = new URLSearchParams(querryString_url_id);
const commandNumber = searchParams.get('order');

//insert the order in DOM
const spanCommandNumber = document.getElementById('orderId').innerHTML = commandNumber