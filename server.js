const express = require('express');
const app = express();
const port = 3000;

// Mock data
const shops = [
    { id: 1, name: 'Shop 1' },
    { id: 2, name: 'Shop 2' },
    { id: 3, name: 'Shop 3' },
];

const drugs = [
    { id: 1, shopId: 1, name: 'Paracetamol', price: 10, description: 'Description 1', imageLink: 'https://cdn8.apopixx.de/1000/web_schraeg/08704083.jpg' },
    { id: 2, shopId: 1, name: 'Ibuprofen', price: 20, description: 'Description 2', imageLink: 'https://property.volksversand.de/media/image/4a/7d/69/10302321-ibuprofen_medibond_400mg_schmerzta_600x600.jpg' },

    { id: 2, shopId: 2, name: 'No-Spa', price: 20, description: 'Description 2', imageLink: 'https://subra.bg/files/richeditor/os-product-images/7/product_22616.jpg' },
    { id: 3, shopId: 2, name: 'Dimidrol', price: 30, description: 'Description 3', imageLink: 'https://vinmec-prod.s3.amazonaws.com/images/20220215_135016_936876_tac-dung-cua-dimedr.max-1800x1800.jpg' },
    { id: 4, shopId: 2, name: 'Propranolol', price: 40, description: 'Description 4', imageLink: 'https://cdn.shop-apotheke.com/images/D16/146/527/D16146527-p15.jpg' },
    { id: 5, shopId: 2, name: 'Prezepam', price: 25, description: 'Description 5', imageLink: 'https://files.apotheeksollie.be/cache/products/images/cache_600x600/33897897_07b516a04f9d5c22029e8090d42390ced98b656f.jpeg' },
    { id: 6, shopId: 2, name: 'Pancreatin', price: 34, description: 'Description 6', imageLink: 'https://c-va.niceshops.com/upload/image/product/large/default/4898_cb5d3362.1024x1024.jpg' },

    { id: 1, shopId: 3, name: 'Validol', price: 10, description: 'Description 1', imageLink: 'https://azcdn.doz.pl/image/d/product/372a0a63-scale-350x350.jpg' },
    { id: 7, shopId: 3, name: 'Duphalac', price: 23, description: 'Description 7', imageLink: 'https://www.soin-et-nature.com/media/cache/shop_product_large_thumbnail/products/2/0/6/3/2/20632-thickbox_default.jpg' }
];

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Routes
app.get('/api/shops', (req, res) => {
    res.json(shops);
});

app.get('/api/drugs', (req, res) => {
    res.json(drugs);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




// Mock code:

// const express = require('express');
// const app = express();
// const port = 3000;

// // Mock data
// const shops = [
//     { id: 1, name: 'Shop 1' },
//     { id: 2, name: 'Shop 2' },
//     { id: 3, name: 'Shop 3' },
// ];

// const drugs = [
//     { id: 1, shopId: 1, name: 'Paracetamol', price: 10, description: 'Description 1', imageLink: 'link' },
//     { id: 2, shopId: 1, name: 'Drug 2', price: 20, description: 'Description 2', imageLink: 'link' },

//     { id: 2, shopId: 2, name: 'Drug 2', price: 20, description: 'Description 2', imageLink: 'link' },
//     { id: 3, shopId: 2, name: 'Drug 3', price: 30, description: 'Description 3', imageLink: 'link' },
//     { id: 4, shopId: 2, name: 'Drug 4', price: 40, description: 'Description 4', imageLink: 'link' },
//     { id: 5, shopId: 2, name: 'Drug 5', price: 25, description: 'Description 5', imageLink: 'link' },
//     { id: 6, shopId: 2, name: 'Drug 6', price: 34, description: 'Description 6', imageLink: 'link' },

//     { id: 1, shopId: 3, name: 'Drug 1', price: 10, description: 'Description 1', imageLink: 'link' },
//     { id: 7, shopId: 3, name: 'Drug 7', price: 23, description: 'Description 7', imageLink: 'link' },
//     { id: 8, shopId: 3, name: 'Drug 8', price: 234, description: 'Description 8', imageLink: 'link' },
//     { id: 9, shopId: 3, name: 'Drug 9', price: 13, description: 'Description 9', imageLink: 'link' },
//     { id: 10, shopId: 3, name: 'Drug 10', price: 87, description: 'Description 10', imageLink: 'link' },
// ];

// // Enable CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });

// // Routes
// app.get('/api/shops', (req, res) => {
//     res.json(shops);
// });

// app.get('/api/drugs', (req, res) => {
//     res.json(drugs);
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });