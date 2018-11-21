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
}

export default SystemConfig;
