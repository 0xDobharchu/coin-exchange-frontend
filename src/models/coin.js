class Coin {
  static coinQuote(data = {}) {
    return {
      amount: data.amount || 0,
      currency: data.currency,
      direction: data.direction,
      fiatAmount: data.fiat_amount || 0,
      fiatAmountCod: data.fiat_amount_cod || 0,
      fiatCurrency: data.fiat_currency,
      fiatLocalAmount: data.fiat_local_amount || 0,
      fiatLocalAmountCod: data.fiat_local_amount_cod || 0,
      fiatLocalCurrency: data.fiat_local_currency,
    };
  }
}

export default Coin;
