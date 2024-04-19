import axios from 'axios';

// Define an empty array to store the products
let PRODUCTS = [];

// Make an HTTP GET request to fetch product data
axios.get('/api/storeitem')
  .then(response => {
    // Assuming the response data is an array of products
    PRODUCTS = response.data.map(product => ({
      id: product.ItemID,
      productName: product.Name,
      price: product.Cost,
      quantity: product.Inventory,
      productImage: product.productImage // Assuming productImage contains the URL of the image
    }));

    // Log the fetched products to verify
    console.log('Fetched Products:', PRODUCTS);
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });

// Function to fetch products
const fetchProducts = () => {
  return axios.get('/api/storeitem')
    .then(response => response.data.map(product => ({
      id: product.ItemID,
      productName: product.Name,
      price: product.Cost,
      quantity: product.Inventory,
      productImage: product.productImage
    })))
    .catch(error => {
      console.error('Error fetching product data:', error);
      return [];  // Return an empty array in case of error
    });
};

export { fetchProducts, PRODUCTS };
