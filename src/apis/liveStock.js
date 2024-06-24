const APIURL = 'http://13.58.187.209';

export const getLiveStock = async ({userId, sessionId, aquariumId}) => {
  return await fetch(`${APIURL}/api/v1/livestock/aquarium/${aquariumId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};

export const createLiveStock = async ({userId, sessionId, payload}) => {
  return await fetch(`${APIURL}/api/v1/livestock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
    body: JSON.stringify(payload),
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};

export const updateLiveStock = async ({
  userId,
  sessionId,
  payload,
  liveStockId,
}) => {
  return await fetch(`${APIURL}/api/v1/livestock/${liveStockId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      session_id: sessionId,
      user_id: userId,
    },
    body: JSON.stringify(payload),
  })
    .then(async res => ({status_code: res.status, data: await res.json()}))
    .then(data => ({status_code: data.status_code, data: data.data}));
};

export const deleteLiveStock = async ({userId, sessionId, liveStockId}) => {
  return await fetch(`${APIURL}/api/v1/livestock/${liveStockId}`, {
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
