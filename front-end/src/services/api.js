const API_BASE_URL = 'https://wigsbtkcinsg.usw.sailos.io';

export const userAPI = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};