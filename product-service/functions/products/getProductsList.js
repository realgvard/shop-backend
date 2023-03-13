'use strict';
const { scanProducts, scanStocks } = require("../../database/dynamoDB");
const { joinProductsWithStocks } = require("../../database/helpers");
const {logError} = require("../../helpers/logger");


module.exports.handler = async (event) => {
  const products = await scanProducts();
  const stocks = await scanStocks();

  if (products.isError) {
    logError(products.error, event);

    return {
      statusCode: 500,
    }
  }

  if (stocks.isError) {
    logError(products.error, event);

    return {
      statusCode: 500,
    }
  }

  const joinedItems = joinProductsWithStocks(products.data, stocks.data);

  return {
    statusCode: 200,
    body: JSON.stringify(joinedItems),
  };
};
