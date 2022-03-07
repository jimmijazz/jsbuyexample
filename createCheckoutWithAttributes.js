
/* Hi Kraig 👋 */ 

import Client from 'shopify-buy';
import fetch from "node-fetch"; 

const store = 'store-name';
const token = 'storefront-api-token';

const client = Client.buildClient({
    domain : `${store}.myshopify.com`,
    storefrontAccessToken : `${token}`
}, fetch);

const handle = 'balter-victoria-xpa';
var productID; 
var variantID; 
var checkoutID; // Our checkout
var checkoutURL; // URL of checkout

// Attributes that will be sent to "note_attributes"
const checkoutCustomAttributes = {customAttributes: [{key: "customCheckoutAttributeKey", value: "customCheckoutAttributeValue"}]};
// Variable line item properties (just to illustrate difference)
const variableCustomAttributes = [{key: "variantKey", value: "variantValue"}];

// Get a product
await client.product.fetchByHandle(handle).then((product) => {
    productID = product.id;
    variantID = product.variants[0]["id"];
    console.log("Retrieved product")
});

// Create checkout
await client.checkout.create().then((checkout) => {
    checkoutID = checkout.id;
    checkoutURL = checkout.webUrl;
    console.log("Created checkout");
});

// Add products to checkout
const lineItemsToAdd = [
  {
    variantId: `${variantID}`,
    quantity: 1,
    customAttributes: variableCustomAttributes // Just to illustrate difference
  }
];

// Add an item to the checkout
await client.checkout.addLineItems(checkoutID, lineItemsToAdd).then((checkout) => {
    console.log("Added line items");
});

// Update custom attributes
await client.checkout.updateAttributes(checkoutID, checkoutCustomAttributes).then((checkout) => {
  console.log("Finished updating attributes");
//   console.log(`Final checkount:\n ${JSON.stringify(checkout)}`);
  console.log(`Checkout URL: ${checkoutURL}`);
});
