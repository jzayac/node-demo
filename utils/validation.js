function isEmpty (value) {
  return value === undefined || value === null || value === '';
}

module.exports = {
  isEmail: (value) => {
    if (!isEmpty(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return true;
    }
  },

  required: (value) => {
    return isEmpty(value);
  }
};
