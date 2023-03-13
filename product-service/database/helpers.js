function joinProductsWithStocks(products, stocks) {
  return products.map(product => {
    return joinProductWithStock(product, stocks.find(stock => stock.product_id === product.id))
  });
}

function joinProductWithStock(product, stock) {
  return {
    ...product,
    count: stock.count
  };
}

module.exports = {
  joinProductsWithStocks,
  joinProductWithStock
}
