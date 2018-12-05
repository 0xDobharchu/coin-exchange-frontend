class SystemConfig {
  static supportCountryRes(data = {}) {
    return {
      active: data.active,
      country: data.country,
      countryName: data.country_name,
      currency: data.currency,
      language: data.language,
      phoneCountryCode: data.phone_country_code
    };
  }
  
  static bankInfoRes(data = {}) {
    return {
      id: data.id,
      country: data.country,
      currency: data.currency,
      accountName: data.account_name,
      accountNumber: data.account_number,
      bankName: data.bank_name,
      bankId: data.bank_id,
      active: data.active
    };
  }

  static popularPlace(data = {}) {
    return {
      id: data.id,
      country: data.country,
      language: data.language,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      active: data.active
    };
  }

  static popularBank(data = {}) {
    return {
      id: data.id,
      country: data.country,
      language: data.language,
      name: data.name,
      active: data.active
    };
  }
}

export default SystemConfig;
