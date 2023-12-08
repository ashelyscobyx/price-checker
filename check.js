const axios = require('axios');

async function getCryptoPrice(symbol) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);

    if (response.status === 200) {
      const data = response.data;
      if (data[symbol.toLowerCase()] && data[symbol.toLowerCase()].usd) {
        return data[symbol.toLowerCase()].usd;
      }
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }

  return null;
}

// Пример использования
const cryptoSymbol = 'bitcoin'; // Пример символа криптовалюты (bitcoin)
getCryptoPrice(cryptoSymbol)
  .then((cryptoPrice) => {
    if (cryptoPrice !== null) {
      console.log(`Current price of ${cryptoSymbol.toUpperCase()}: $${cryptoPrice}`);
    } else {
      console.log(`Failed to fetch the price of ${cryptoSymbol.toUpperCase()}`);
    }
  });
