const APIURL = 'http://13.58.187.209';
export const createExpense = async ({userId, sessionId, payload}) => {
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
    const response = await fetch(`${APIURL}/api/v1/expenses`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(data => ({status_code: data.status_code, data: data.data}));
    return response;
  } catch (error) {
    return error.response.data;
  }
};
export const getExpenses = async ({userId, sessionId}) => {
  try {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        session_id: sessionId,
        user_id: userId,
      },
    };
    const response = await fetch(`${APIURL}/api/v1/expenses`, data)
      .then(async res => ({status_code: res.status, data: await res.json()}))
      .then(res => ({status_code: res.status_code, data: res?.data}));
    return response;
  } catch (error) {
    return error;
  }
};
