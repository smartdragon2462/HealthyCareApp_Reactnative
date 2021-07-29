import queryString from 'query-string';
import { Platform } from 'react-native';
import { base_url } from './config';

// const base_url = 'http://192.168.110.114:5000/api/';
// const base_url = 'https://formidablewomanmingles.com/api/';

export function update(user, token) {
  var formData = new FormData();

  if (user.avatar) {
    let imgName = user.avatar.fileName;
    if (!imgName || imgName == 'undefined') {
      var getFilename = user.avatar.uri.split('/');
      imgName = getFilename[getFilename.length - 1];
    }

    formData.append('imgFile', {
      name: imgName,
      type: user.avatar.type,
      uri:
        Platform.OS === 'android'
          ? user.avatar.uri
          : user.avatar.uri.replace('file://', ''),
    });
  }

  if (user.email) formData.append('email', user.email);
  formData.append('name', user.name);
  formData.append('state', user.state);
  formData.append('city', user.city);
  formData.append('gender', user.gender);
  formData.append('bio', user.bio);
  formData.append('age', user.age);

  if (user.quiz) formData.append('quiz', JSON.stringify(user.quiz));

  if (user.assessment)
    formData.append('assessment', JSON.stringify(user.assessment));

  return fetch(`${base_url}update`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data'
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////
export function login(user) {
  return fetch(`${base_url}account/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: user.phone, password: user.password }),
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}


//////////////////////////////////////////////////////////////////////////////
export function userLogin(user) {
  return fetch(`${base_url}user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: user.phone, password: user.password }),
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////
export function doctorLogin(user) {
  return fetch(`${base_url}doctor/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////
export function visitorLogin(user) {
  return fetch(`${base_url}doctor/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

////////////////////////////////////////////////////////////////////////
export function validateToken(user) {
  var formData = new FormData();
  formData.append('token', user.token);

  return fetch(`${base_url}validateToken`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

////////////////////////////////////////////////////////////////////////
export function logout(data) {
  var formData = new FormData();
  formData.append('token', data.token);

  return fetch(`${base_url}logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}


////////////////////////////////////////////////////////////////////////
export function register(user) {
  const formdata = new FormData();

  formdata.append('name', user.name);
  formdata.append('email', user.email);
  formdata.append('password', user.password);
  // formdata.append('state', user.state);
  // formdata.append('city', user.city);
  // formdata.append('age', user.age);
  // formdata.append('gender', user.gender);
  formdata.append('verificationCode', user.verificationCode);

  return fetch(`${base_url}register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function verifyEmail(token) {
  const formdata = new FormData();

  formdata.append('token', token);
  return fetch(`${base_url}verify`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function sendVerificationCode(data) {
  const formdata = new FormData();

  formdata.append('email', data.email);
  formdata.append('verificationCode', data.verificationCode);

  return fetch(`${base_url}sendCode`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function resetPassword(data) {
  return fetch(`${base_url}account/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify({ phone: data.phone, password: data.password }),
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  // const formdata = new FormData();

  // formdata.append('email', data.email);
  // formdata.append('password', data.password);

  // return fetch(`${base_url}resetPassword`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   body: formdata,
  // })
  //   .then((response) => response.json())
  //   .then((responsJson) => {
  //     return responsJson;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return error;
  //   });
}

// ////////////////////////////////////////////////////////////////////////
// export function getProduct(data) {
//   const formdata = new FormData();

//   formdata.append('postCode', data.postCode);
//   formdata.append('Ix', data.Ix);
//   formdata.append('Sx', data.Sx);

//   console.log(data.token);
//   return fetch(`${base_url}getProduct`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${data.token}`,
//     },
//     body: formdata,
//   })
//     .then((response) => response.json())
//     .then((responsJson) => {
//       return responsJson;
//     })
//     .catch((error) => {
//       console.log(error);
//       return error;
//     });
// }

////////////////////////////////////////////////////////////////////////
export function logOut(authId, username, password) {
  return fetch(`https://api.github.com/authorizations/${authId}`, {
    method: 'DELETE',
    headers: getAuthHeader(username, password),
  })
    .then((user) => {
      return user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

////////////////////////////////////////////////////////////////////////
export function checkAbleToChat(token) {
  return fetch(`${base_url}checkAbleToChat`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {},
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function getExploreData(token) {
  return fetch(`${base_url}getExploreData`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {},
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function getMyMessages(data) {
  return fetch(`${base_url}getMyMessages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: {},
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function sendMessage(data) {
  const formdata = new FormData();
  let msg = data.message;
  formdata.append('_id', msg._id);
  formdata.append('subject', msg.subject);
  formdata.append('body', msg.body);
  formdata.append('isCreatedByCustomer', true);

  return fetch(`${base_url}sendMessage`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
export function readMessage(msg) {
  const formdata = new FormData();

  formdata.append('isReadByCustomer', true);
  return fetch(`${base_url}readMessage/${msg._id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    body: formdata,
  })
    .then((response) => response.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

////////////////////////////////////////////////////////////////////////
function getAuthHeader(username, password) {
  const baseString = Base64.btoa(`${username}:${password}`).replace(
    '\n',
    '\\n',
  );
  return {
    ...consts.BASE_HEADER,
    Authorization: `Basic ${baseString}`,
  };
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function createCode(phone) {
  return fetch(`${base_url}phone-verification/create-code`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: phone }),
  })
    .then((res) => res.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function confirmCode(req) {
  console.log("req=========>", req)
  return fetch(`${base_url}phone-verification/enter-code`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "phone": req.phone, "code": req.code }),
  })
    .then((res) => res.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function createUser(req) {
  console.log("createUser=========>", req)
  return fetch(`${base_url}user/new`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "phone": req.phone, "password":req.password}),
  })
    .then((res) => res.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function createDoctor(req) {
  return fetch(`${base_url}doctor/new`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "phone": req.phone, "password":req.password}),
  })
    .then((res) => res.json())
    .then((responsJson) => {
      return responsJson;
    })
    .catch((error) => {
      console.log(error);
    });
}
