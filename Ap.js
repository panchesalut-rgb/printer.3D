let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    document.getElementById('cart-count').innerText = cart.length;
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`${productName} ajouté ! Total actuel du panier : ${total.toFixed(2)} €`);
    
    // Note : Pour l'étape suivante, vous connecterez ce panier à un système comme Stripe ou PayPal
}
