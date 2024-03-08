let cart = {};

const drugs = [
    { id: 1, shopId: 1, name: 'Paracetamol', price: 10, description: 'Description 1', imageLink: 'https://cdn8.apopixx.de/1000/web_schraeg/08704083.jpg' },
    { id: 2, shopId: 1, name: 'Ibuprofen', price: 20, description: 'Description 2', imageLink: 'https://property.volksversand.de/media/image/4a/7d/69/10302321-ibuprofen_medibond_400mg_schmerzta_600x600.jpg' },

    { id: 3, shopId: 2, name: 'No-Spa', price: 20, description: 'Description 2', imageLink: 'https://subra.bg/files/richeditor/os-product-images/7/product_22616.jpg' },
    { id: 4, shopId: 2, name: 'Dimidrol', price: 30, description: 'Description 3', imageLink: 'https://vinmec-prod.s3.amazonaws.com/images/20220215_135016_936876_tac-dung-cua-dimedr.max-1800x1800.jpg' },
    { id: 5, shopId: 2, name: 'Propranolol', price: 40, description: 'Description 4', imageLink: 'https://cdn.shop-apotheke.com/images/D16/146/527/D16146527-p15.jpg' },
    { id: 6, shopId: 2, name: 'Prezepam', price: 25, description: 'Description 5', imageLink: 'https://files.apotheeksollie.be/cache/products/images/cache_600x600/33897897_07b516a04f9d5c22029e8090d42390ced98b656f.jpeg' },
    { id: 7, shopId: 2, name: 'Pancreatin', price: 34, description: 'Description 6', imageLink: 'https://c-va.niceshops.com/upload/image/product/large/default/4898_cb5d3362.1024x1024.jpg' },

    { id: 8, shopId: 3, name: 'Validol', price: 10, description: 'Description 1', imageLink: 'https://azcdn.doz.pl/image/d/product/372a0a63-scale-350x350.jpg' },
    { id: 9, shopId: 3, name: 'Duphalac', price: 23, description: 'Description 7', imageLink: 'https://www.soin-et-nature.com/media/cache/shop_product_large_thumbnail/products/2/0/6/3/2/20632-thickbox_default.jpg' }
];

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


function addToCart(drugId) {
    drugId = Number(drugId);
    
    const drug = drugs.find(d => d.id === drugId);
      
    if (!drug) {
      console.error('Drug not found for ID:', drugId);
      return;
    }
  
    if (cart[drugId]) {
      cart[drugId].quantity += 1;
    } else {
      cart[drugId] = {...drug, quantity: 1};
    }
    
    updateCartUI();
}


function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the container before updating
  
    Object.entries(cart).forEach(([drugId, drug]) => {
      const drugElement = document.createElement('div');
      drugElement.className = 'cart-item';
      drugElement.innerHTML = `
        <img src="${drug.imageLink}" alt="${drug.name}" style="width:150px; height:auto;">
        <p>${drug.name}</p>
        <p>Price: $${drug.price * drug.quantity}</p>
        <div>
            <button onclick="decrementQuantity(${drugId})">-</button>
            <span>Quantity: ${drug.quantity}</span>
            <button onclick="incrementQuantity(${drugId})">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(drugElement);
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
    let url = 'http://localhost:3000/api/drugs';
    if (shopId) {
        url += `?shopId=${shopId}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const drugsContainer = document.getElementById('drugs');
            drugsContainer.innerHTML = '';
            data.forEach(drug => {
                const drugElement = document.createElement('div');
                drugElement.className = 'drug';
                drugElement.innerHTML = `
                    <img src="${drug.imageLink}" alt="${drug.name}" style="width:100px; height:auto;">
                    <h3>${drug.name}</h3>
                    <p>Price: $${drug.price}</p>
                    <p>${drug.description}</p>
                    <div class="add-to-cart" onclick="addToCart('${drug.id}')">Add to Cart</div>
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
}

function incrementQuantity(drugId) {
    if (cart[drugId]) {
        cart[drugId].quantity += 1;
        updateCartUI();
    }
}

function decrementQuantity(drugId) {
    if (cart[drugId] && cart[drugId].quantity > 1) {
        cart[drugId].quantity -= 1;
        updateCartUI();
    } else if (cart[drugId] && cart[drugId].quantity === 1) {
        delete cart[drugId]; // Optionally remove the item if quantity reaches 0
        updateCartUI();
    }
}