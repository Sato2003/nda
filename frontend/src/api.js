const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'nda_auth_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
};

const request = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson && text ? JSON.parse(text) : null;

  if (!isJson) {
    const looksLikeHtml = text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html');
    if (looksLikeHtml) {
      throw new Error(`The frontend reached HTML instead of the API at ${API_BASE_URL}. Make sure the backend is running and VITE_API_URL is correct.`);
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Request failed.');
  }

  if (!isJson) {
    throw new Error('The API returned a non-JSON response.');
  }

  return data;
};

export const api = {
  getStoredToken: getToken,
  clearSession: () => setToken(null),
  register: async (payload) => {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setToken(data.token);
    return data.user;
  },
  login: async (payload) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setToken(data.token);
    return data.user;
  },
  getCurrentUser: async () => {
    const data = await request('/auth/me');
    return data.user;
  },
  updatePassword: async (payload) => {
    const data = await request('/auth/password', {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    return data.user;
  },
  resetPassword: async (payload) => {
    await request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  getUsers: async () => {
    const data = await request('/users');
    return data.users;
  },
  getNdas: async (signerEmail) => {
    const query = signerEmail ? `?signerEmail=${encodeURIComponent(signerEmail)}` : '';
    const data = await request(`/ndas${query}`);
    return data.ndas;
  },
  createNda: async (payload) => {
    const data = await request('/ndas', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return data.nda;
  },
  signNda: async (id, payload) => {
    const data = await request(`/ndas/${id}/sign`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    return data.nda;
  },
  revokeNda: async (id, payload) => {
    const data = await request(`/ndas/${id}/revoke`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    return data.nda;
  },
  deleteNda: async (id) => {
    await request(`/ndas/${id}`, { method: 'DELETE' });
  },
  getActivityLogs: async (signerEmail) => {
    const query = signerEmail ? `?signerEmail=${encodeURIComponent(signerEmail)}` : '';
    const data = await request(`/activity-logs${query}`);
    return data.logs;
  }
};
