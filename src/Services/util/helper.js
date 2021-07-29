import moment from "moment";
import axios from "axios";
// import DateFnsUtils from "@date-io/date-fns";
import queryString from "query-string";
// import format from "date-fns/format";
// import { PatientHomePageMessage } from './translations/en.lang.json';
import config from "./config";

const { serverUri } = config;

const _cleaveStacks = {
  phone: [2, 2, 2, 2, 2],
  code: [1, 2, 2, 2, 3, 3, 2],
};

const _filetypes = ["image/jpeg", "image/gif", "image/png", "application/pdf"];

const _filterWithCleave = (number, type) => {
  const schema = _cleaveStacks[type];
  const strNoSpace = number.replace("+", "").split(" ").join("");
  const result = new Array(schema.length);
  let a = 0;
  for (let i = 0; i < schema.length; i++) {
    if (strNoSpace[a] === undefined) break;
    result[i] = [];
    for (let j = 0; j < schema[i]; j++) {
      result[i].push(strNoSpace[a]);
      a++;
    }
  }
  const resultReturned = [];
  result.map((e) => resultReturned.push(e.join("")));
  const str = resultReturned.join(" ");
  // console.log("")
  if (type === "code") {
    return str;
  } else if (type === "phone") {
    return str.includes("+") ? str : `${str}`;
  } else {
    return str;
  }
};

const validateEmail = (email) => new RegExp(/^[^@]+@[^@]+\.[^@]+$/).test(email);

// const EmailValidate = (text) => {
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (reg.test(text) === false)   return false;
//   else return true;
// }

const validatePassword = (pwd) =>
  new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  ).test(pwd);

const validatePhoneNumber = (val) => {
  return new RegExp(/\d{10}/).test(val.replace("+", "").split(" ").join(""));
};

const validateNpi = (val) => {
  return val.length === 11 && new RegExp(/\d{11}/).test(val);
};

const validateSecurityCode = (code) => {
  const formattedCode = code.split(" ").join("");
  return (
    formattedCode.length === 15 && new RegExp(/\d{15}/).test(formattedCode)
  );
};

const validateGender = (gender) => {
  // if (gender === PatientHomePageMessage.F) gender = 'mme';
  const flag = ["M", "F"].includes(gender);
  return flag;
};

const validateDate = (date) => {
  return date ? moment(date).isValid() : false;
};

const validateFile = (file) => {
  if (!_filetypes.includes(file.type)) {
    return { status: "error", message: "file type is not vaild" };
  }

  if (file.size / 1000000 > 10) {
    return { status: "error", message: "file size is exceed limit" };
  }

  return { status: "ok", message: "vaild file" };
};

const validateFormData = (data, fieldsData) => {
  const errors = {};
  let isValid = true;

  Object.keys(data).forEach((key) => {
    const item = data[key];
    let flag = true;

    if (key === "email") {
      if (item) {
        errors[key] = validateEmail(item) ? false : "invalidFormat";
      } else {
        errors[key] = true;
      }
      flag = !errors[key];
    } else if (key === "phone" || key === "emergencyContactPhone") {
      if (item) {
        errors[key] = validatePhoneNumber(item) ? false : "invalidFormat";
      } else {
        errors[key] = true;
      }
      flag = !errors[key];
    } else if (
      key === "birthDate" ||
      key === "interventionDate" ||
      key === "operationDate"
    ) {
      if (item) {
        errors[key] = validateDate(item) ? false : "invalidFormat";
      } else {
        errors[key] = true;
      }
      flag = !errors[key];
    } else if (key === "gender") {
      if (item) {
        errors[key] = validateGender(item) ? false : "invalidFormat";
      } else {
        errors[key] = true;
      }
      flag = !errors[key];
    } else if (key === "socialSecurityNumber") {
      if (item) {
        errors[key] = validateSecurityCode(item) ? false : "invalidFormat";
      } else {
        errors[key] = true;
      }
      flag = !errors[key];
    } else {
      flag = fieldsData[key].notRequired
        ? true
        : (item && !!item.length) || item;
      errors[key] = !flag;
    }

    isValid = isValid && flag;
  });

  return { isValid, errors };
};

const isBrowser = () => typeof window !== "undefined";

const isLegalCalcul = (x) => {
  if (x) {
    const diff = new Date().getTime() - new Date(x).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age >= 18;
  }
  return true;
};

const transformPhoneNumber = (x) => {
  const phoneArray = x.slice(3).split("");
  const result = ["0"];
  for (let i = 0; i < phoneArray.length; i++) {
    if ((i + 0) % 2) result.push(" ");
    result.push(phoneArray[i]);
  }
  return result.join("");
};

const getScrollY = () => {
  if (isBrowser()) return window.pageYOffset;
  return 0;
};

const getFileSize = (file) => {
  if (!file || !file.size) {
    return "";
  }
  const { size } = file;
  const convertedSize = Math.trunc(size * 0.008);
  const formatedSize = `${convertedSize} KB`;
  return formatedSize;
};

const acceptScrolling = () => {
  if (isBrowser()) {
    // document.body.style.overflow = "unset";
  }
};

const deleteScrolling = () => {
  if (isBrowser()) {
    // document.body.style.overflow = "hidden";
  }
};

const getDateString = (date) => {
  const dateString = moment(date).format("YYYY-MM-DD");

  return dateString;
};

const getTodayString = () => {
  return moment().format("YYYY-MM-DD");
};

class LocalizedUtils extends DateFnsUtils {
  // getDatePickerHeaderText(date) {
  //   return format(date, "d MMM yyyy", { locale: this.locale });
  // }
}

const getCleaveValue = (number, type) => {
  // if (!number || number.length < 8) return '';
  const pureNumber = number.replace("+", "").replace("-", "").replace(" ", "");
  console.log("getCleaveValue", pureNumber, type, pureNumber.slice(0, 2));
  const needFix = pureNumber.slice(0, 2) === "33" && type === "phone";
  const localPhoneNumber = needFix ? pureNumber.replace("33", "0") : pureNumber;
  const formattedNumber = _filterWithCleave(localPhoneNumber, type);
  return formattedNumber;
};

const getUploadedFilePath = (payload, file) => {
  const obj = JSON.parse(payload);
  const keyAry = obj.key.split("/");
  keyAry.pop();
  keyAry.push(file.name);
  const newKey = keyAry.join("/");
  return newKey;
};

const sendRequest = (params) => {
  const { method, body, token } = params;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token) {
    headers.append("Authorization", token);
  }

  return fetch(serverUri, {
    method,
    headers,
    body,
  });
};

const sendFileRequest = async (params) => {
  // delete Authorization object inside header
  delete axios.defaults.headers.common;
  const { serverUrl, payload, file } = params;
  // Init of formData, and configuring it with payload information
  const obj = JSON.parse(payload);
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    formData.set(key, obj[key]);
  });
  formData.set("Content-Type", `${file.type}`);
  formData.set("file", file);
  const option = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await axios.post(serverUrl, formData, option);
  axios.defaults.headers.common = {};
  // Put back again the Authorization Header
  return result;
};

const getFormattedAuthInfo = (token) => {
  return { token: token, authorization: `JWT ${token}` };
};

/**
 * Parse float from a string
 *
 * @param {String} str - string to parse
 *
 * @return {Number|null} number parsed from the string, null if not a number
 */
const parseFloatNum = (str) => {
  const trimmed = str && typeof str.trim === "function" ? str.trim() : null;
  if (!trimmed) {
    return null;
  }
  const num = parseFloat(trimmed);
  const isNumber = Number.isNaN(num);
  const isFullyParsedNum = isNumber && num.toString() === trimmed;
  return isFullyParsedNum ? num : null;
};

/**
 * Serialise given object into a string that can be used in a
 * URL. Encode SDK types into a format that can be parsed with `parse`
 * defined below.
 *
 * @param {Object} params - object with strings/numbers/booleans or
 * SDK types as values
 *
 * @return {String} query string with sorted keys and serialised
 * values, `undefined` and `null` values are removed
 */
const stringify = (params) => {
  const cleaned = Object.keys(params).reduce((result, key) => {
    /* eslint-disable no-param-reassign */
    const val = params[key];
    if (key !== null) {
      result[key] = val;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
  return queryString.stringify(cleaned);
};

/**
 * Parse a URL search query. Converts numeric values into numbers,
 * 'true' and 'false' as booleans, and serialised LatLng and
 * LatLngBounds into respective instances based on given options.
 *
 * @param {String} search - query string to parse, optionally with a
 * leading '?' or '#' character
 *
 * @param {Object} options - Options for parsing:
 *
 * - latlng {Array<String} keys to parse as LatLng instances, null if
 *   not able to parse
 * - latlngBounds {Array<String} keys to parse as LatLngBounds
 *   instances, null if not able to parse
 *
 * @return {Object} key/value pairs parsed from the given String
 */
const parse = (search) => {
  const params = queryString.parse(search);
  return Object.keys(params).reduce((result, key) => {
    const val = params[key];
    /* eslint-disable no-param-reassign */
    if (val === "true") {
      result[key] = true;
    } else if (val === "false") {
      result[key] = false;
    } else {
      const num = parseFloatNum(val);
      result[key] = num === null ? val : num;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
};

const isDateString = (str) => {
  if (str && typeof str === "string") {
    return str.split("-").length === 3;
  }
  return false;
};

const stringToDate = (str) => {
  const strAry = str.split("-");
  const date = new Date(strAry[0], strAry[1], strAry[2]);
  return date;
};

const convertDateFromObj = (data) => {
  const values = Object.values(data).map((val) =>
    isDateString(val) ? stringToDate(val) : val
  );
  const keys = Object.keys(data);
  const result = values.reduce((res, val, index) => {
    res[keys[index]] = val;
    return res;
  }, {});

  return result;
};

export {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateSecurityCode,
  validateNpi,
  validateGender,
  validateFile,
  validateDate,
  validateFormData,
  isBrowser,
  isLegalCalcul,
  transformPhoneNumber,
  getDateString,
  getTodayString,
  getCleaveValue,
  getScrollY,
  acceptScrolling,
  deleteScrolling,
  getFileSize,
  LocalizedUtils,
  sendRequest,
  sendFileRequest,
  getFormattedAuthInfo,
  parseFloatNum,
  stringify,
  parse,
  isDateString,
  convertDateFromObj,
  getUploadedFilePath,
};
