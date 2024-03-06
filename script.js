let cart = []; 

document.addEventListener('DOMContentLoaded', function() {
    fetchShops();
    document.getElementById('shopsTab').addEventListener('click', () => switchTab('shops'));
    document.getElementById('cartTab').addEventListener('click', () => switchTab('cart'));
});

function switchTab(tab) {
    const shopsSection = document.getElementById('selection');
    const cartSection = document.getElementById('cart');
    if (tab === 'shops') {
        shopsSection.style.display = '';
        cartSection.style.display = 'none';
    } else {
        shopsSection.style.display = 'none';
        cartSection.style.display = '';
        updateCartUI();
    }
}


function addToCart(drugName) {
    cart.push(drugName);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI(); 
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerText = item;
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = function() { removeFromCart(index); };
        itemElement.appendChild(removeButton);
        cartContainer.appendChild(itemElement);
    });
}


function fetchShops() {
    fetch('http://localhost:3000/api/shops')
        .then(response => response.json())
        .then(data => {
            const shopsContainer = document.getElementById('shops');
            shopsContainer.innerHTML = '';
            data.forEach(shop => {
                const shopElement = document.createElement('div');
                shopElement.innerText = shop.name;
                shopElement.onclick = function() { fetchDrugs(shop.id); };
                shopsContainer.appendChild(shopElement);
            });
        });
}

function fetchDrugs(shopId) {
    fetch('http://localhost:3000/api/drugs')
        .then(response => response.json())
        .then(data => {
            const drugsContainer = document.getElementById('drugs');
            drugsContainer.innerHTML = '';
            data.filter(drug => drug.shopId === shopId).forEach(drug => {
                const drugElement = document.createElement('div');
                drugElement.className = 'drug';
                drugElement.innerHTML = `
                    <img src="${drug.imageLink}" alt="${drug.name}" style="width:100px; height:auto;">
                    <h3>${drug.name}</h3>
                    <p>Price: $${drug.price}</p>
                    <p>${drug.description}</p>
                    <div class="add-to-cart" onclick="addToCart('${drug.name}')">Add to Cart</div>
                `;
                drugsContainer.appendChild(drugElement);
            });
        });
}

function submitOrder() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    console.log('Order Info:', { name, email, phone, address });
    // Тут можна додати логіку для відправки інформації на сервер або інше оброблення
}
