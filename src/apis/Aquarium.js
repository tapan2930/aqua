const APIURL = 'http://13.58.187.209';
export const createAquarium = async ({userId, sessionId, payload}) => {
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
    const response = await fetch(`${APIURL}/api/v1/aquariums`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, data: data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAquariums = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
      body: JSON.stringify({
        page_num: 1,
        is_deleted: false,
      }),
    };
    const response = await fetch(`${APIURL}/api/v1/aquariums`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(res => ({status_code: res.status_code, data: res?.data?.data}));
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAquarium = async ({userId, sessionId, payload}) => {
  try {
    const data = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
      body: JSON.stringify({...payload, id: undefined}),
    };
    const response = await fetch(
      `${APIURL}/api/v1/aquariums/${payload.id}`,
      data,
    )
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, data: data.data}));

    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export const deleteAquarium = async ({userId, sessionId, aquariumId}) => {
  const data = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
  };
  return await fetch(`${APIURL}/api/v1/aquariums/${aquariumId}`, data)
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};

export const createGroup = async ({userId, sessionId, payload}) => {
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
    const response = await fetch(`${APIURL}/api/v1/aquariumgroup`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, data: data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroups = async ({userId, sessionId}) => {
  return await fetch(`${APIURL}/api/v1/aquariumgroup`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(res => ({status_code: res.status_code, data: res?.data}));
};

export const updateGroup = async ({userId, sessionId, payload, groupId}) => {
  return await fetch(`${APIURL}/api/v1/aquariumgroup/${groupId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
    body: JSON.stringify({...payload}),
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};

export const deleteGroup = async ({userId, sessionId, groupId}) => {
  return await fetch(`${APIURL}/api/v1/aquariumgroup/${groupId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};
