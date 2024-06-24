const APIURL = 'http://13.58.187.209';

export const postParams = async ({userId, sessionId, aquariumId, payload}) => {
  return await fetch(`${APIURL}/api/v1/aquariums/${aquariumId}/params`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
    body: JSON.stringify(payload),
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(res => ({status_code: res.status_code, data: res.data}));
};

export const putParams = async ({
  userId,
  sessionId,
  aquariumId,
  paramId,
  payload,
}) => {
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
    const response = await fetch(
      `${APIURL}/api/v1/aquariums/${aquariumId}/params/${paramId}`,
      data,
    )
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(res => ({status_code: res.status_code, data: res.data}));
    return response;
  } catch (error) {
    console.log('error', error);
    return {status_code: 500, error: 'Something went wrong!'};
  }
};

export const getParams = async ({userId, sessionId, aquariumId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(
      `${APIURL}/api/v1/aquariums/${aquariumId}/params`,
      data,
    )
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(res => ({status_code: res.status_code, data: res.data}));
    return response;
  } catch (error) {
    console.log('error', error);
    return {status_code: 500, error: 'Something went wrong!'};
  }
};
