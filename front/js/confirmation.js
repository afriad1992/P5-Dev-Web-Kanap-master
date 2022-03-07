var order=document.getElementById("orderId");
const urlParams = new URLSearchParams(document.location.search);
order.textContent=urlParams.get('orderId');


