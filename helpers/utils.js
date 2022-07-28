/**
 * Standard Format of the Response for All API Calls
 */
module.exports.response = (code, msg, data = null) => {
  return {
    result: {
      status: code,
      message: msg,
      data: data,
    },
  };
};

/**
 * Method to Check is Certain Data is Not Empty, Using Call Back Function
 */
module.exports.isDataNotEmpty = (data, cb, cb2 = null) => {
  if (
    data != null &&
    data != 0 &&
    data != "" &&
    data != {} &&
    typeof data != "undefined"
  ) {
    cb();
  } else {
    cb2();
  }
};

/**
 * Method to Check Data Emptiness in Boolean
 */
module.exports.CheckIfEmpty = (data) => {
  if (
    data != null &&
    data != 0 &&
    data != "" &&
    data != {} &&
    typeof data != "undefined"
  ) {
    return true;
  } else {
    return false;
  }
};
