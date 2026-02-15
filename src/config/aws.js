// AWS SDK configuration
export const AWS_CONFIG = {
  region: import.meta.env.VITE_AWS_REGION || 'eu-north-1',
  apiGatewayUrl: import.meta.env.VITE_AWS_API_GATEWAY_URL,
};

// API helper functions
export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${AWS_CONFIG.apiGatewayUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${AWS_CONFIG.apiGatewayUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${AWS_CONFIG.apiGatewayUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${AWS_CONFIG.apiGatewayUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};
