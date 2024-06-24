const APIURL = 'http://13.58.187.209';

export const getConfigStatus = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/config/setup`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getBasicConfig = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/config/basic`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const putBasicConfig = async ({userId, sessionId, payload}) => {
  try {
    const data = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
      body: JSON.stringify({
        ...payload,
        country_list: [payload.country],
        currency_list: [payload.currency],
      }),
    };

    const response = await fetch(`${APIURL}/api/v1/config/basic`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, ...data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAvaliableParameter = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/config/param_template`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({
        status_code: data.status_code,
        data: data.data.parameters,
      }));

    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const putParameterConfig = async ({userId, sessionId, payload}) => {
  try {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${APIURL}/api/v1/config/param`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, data: data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getParameters = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/config/param`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({
        status_code: data?.data?.status_code || data.status_code,
        data: data?.data,
      }));
    console.log(response, '-------------------------------------------');
    return response;
  } catch (error) {
    return error.response.data;
  }
};
