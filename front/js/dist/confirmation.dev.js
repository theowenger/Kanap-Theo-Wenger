"use strict";

//Get URL 
var querryString_url_id = window.location.search;
var searchParams = new URLSearchParams(querryString_url_id);
var commandNumber = searchParams.get('order'); //insert the order in DOM

var spanCommandNumber = document.getElementById('orderId').innerHTML = commandNumber;