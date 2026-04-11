const API_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-backend-psi-flax-75.vercel.app';

/**
 * Helper function to handle fetch responses and common headers
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    const data = await response.json();
    
    // Log full backend response for debugging as requested
    console.log(`[API Response] ${options.method || 'GET'} ${endpoint}:`, {
      status: response.status,
      ok: response.ok,
      data
    });

    if (!response.ok) {
      // Handle backend errors (supporting both 'error' and 'message' keys)
      const errorMsg = data.error || data.message || `Error ${response.status}: Something went wrong`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
};

/**
 * User Login - POST /auth/login
 */
export const loginUser = async (email, password) => {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
};

/**
 * User Signup - POST /auth/signup
 */
export const signupUser = async (email, password, displayName) => {
  return await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName }),
  });
};

/**
 * Create Order - POST /orders
 */
export const placeOrder = async (orderData) => {
  return await apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

/**
 * Get All Orders - GET /orders
 */
export const getOrders = async () => {
  return await apiFetch('/orders', {
    method: 'GET',
  });
};

/**
 * Get Admin Homepage Config - GET /admin/homepage
 */
export const getAdminHomepage = async () => {
  return await apiFetch('/admin/homepage', {
    method: 'GET',
  });
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  window.location.href = '/login';
};