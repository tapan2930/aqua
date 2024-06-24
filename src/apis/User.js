import {md5} from 'js-md5';

const APIURL = 'http://13.58.187.209';

export const createUser = async ({email, password}) => {
  try {
    const md5Password = md5(password);
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password: md5Password}),
    };
    const response = await fetch(`${APIURL}/api/v1/users/signup`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => data);
    return response;
  } catch (error) {
    return {status_code: 500, error: 'Internal Server Error'};
  }
};

export const loginUser = async ({email, password}) => {
  try {
    const md5Password = md5(password);
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password: md5Password}),
    };
    const response = await fetch(`${APIURL}/api/v1/users/login`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data.data}));

    return response;
  } catch (error) {
    return {status_code: 500, error: 'Internal Server Error'};
  }
};

export const sentVerificationCode = async ({email}) => {
  try {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    };
    const response = await fetch(`${APIURL}/api/v1/users/otp/generate`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data}));
    return response;
  } catch (error) {
    return {status_code: 500, error: 'Internal Server Error'};
  }
};

export const VerifyCode = async ({email, otp}) => {
  try {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp}),
    };
    const response = await fetch(`${APIURL}/api/v1/users/otp/verify`, data)
      .then(res => res.json())
      .then(data => data);
    return response;
  } catch (error) {
    return {status_code: 500, error: 'Internal Server Error'};
  }
};

export const getUserbyId = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/users/${userId}`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data}));
    return response;
  } catch (error) {
    return {status_code: 500, error: 'Internal Server Error'};
  }
};

export const updateUserData = async ({userId, sessionId, payload}) => {
  try {
    const data = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${APIURL}/api/v1/users/profile`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
