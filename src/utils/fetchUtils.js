import fetch from 'isomorphic-fetch'

// fetch Utilities
const API_URL = '/api/'

// Set Headers
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('idToken')}`
  }
}

// Handle Response
async function handleResponse(res) {
  let data
  try {
    data = await res.json()
  } catch (err) {
    throw new Error(err);
  }
  if (res.status >= 400) {
    throw new Error('database error');
  }
  return data
}

function formUrl(path) {
  return API_URL + path
}


// HTTP METHODS /////////////////////////////

// fetch GET Utility
export async function get(path) {
  const url = formUrl(path)
  const res = await fetch(url, {
    method: 'GET',
    headers: getHeaders()
  })
  return await handleResponse(res)
}


//fetch POST Utility
export function post(path) {
  const url = formUrl(path)
  return async (body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
    return await handleResponse(res)
  }
}

export function put(path) {
  const url = formUrl(path)
  return async (body) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
    return await handleResponse(res)
  }
}

// fetch DELETE Utility
export async function del(path) {
  const url = formUrl(path)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return await handleResponse(res)
}
