
export const validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text)
}

export const checkPassword1 = (text) => {
    // at least one special character, at least 8 digits.
    var reg = /(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[0-9])(?=.*[!@#$%^&*]).{9,}/;
  return reg.test(text)
}

export const checkPassword = (text) => {
  // at least 8 characters, with a mix of at least one uppercase letter, one lower case letter, one number and one special character
  var reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/;
  return reg.test(text)
}

////////////////////////////////////////////////////////////////////////////////
export const convertHourDigit =(val)=>{
  let hourStr = "";
  if (val < 10) hourStr = "0" + String(val);
  else hourStr= String(val); 
  return hourStr;
}
