'use strict';
const { scanProducts, scanStocks } = require("../../database/dynamoDB");
const { joinProductsWithStocks } = require("../../database/helpers");


module.exports.handler = async (event) => {
  console.log('Log: ', event);

  const products = await scanProducts();
  const stocks = await scanStocks();

  if (products.isError || stocks.isError) {
    return {
      statusCode: 200,
    }
  }

  const joinedItems = joinProductsWithStocks(products.data, stocks.data);

  return {
    statusCode: 200,
    body: JSON.stringify(joinedItems),
  };
};
