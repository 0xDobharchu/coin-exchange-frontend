class LocalStore {
  static save(key, data) {
    if(__CLIENT__) {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }
    return false;
  }

  static get(key) {
    if(__CLIENT__){

      const data = localStorage.getItem(key);
      if (data) {
        if (data === 'undefined') {
          LocalStore.remove(key);
          return false;
        }
        return JSON.parse(data);
      }
    }
    return false;
  }

  static remove(key) {
    if(__CLIENT__){
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }
}

export default LocalStore;
