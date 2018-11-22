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

  static coinOrderRes(data = {}) {
    return {
      address: data.address,
      amount: data.amount || 0,
      createdAt: data.created_at,
      currency: data.currency,
      duration: data.duration || 0,
      fiatAmount: data.fiat_amount || 0,
      fiatCurrency: data.fiat_currency,
      fiatLocalAmount: data.fiat_local_amount || 0,
      fiatLocalCurrency: data.fiat_local_currency,
      id: data.id,
      orderType: data.order_type,
      receiptUrl: data.receipt_url,
      refCode: data.ref_code,
      reviewed: data.reviewed,
      status: data.status,
      txHash: data.tx_hash,
      updatedAt: data.updated_at,
      userInfo: data.user_info || {}
    };
  }
}

export default Coin;
