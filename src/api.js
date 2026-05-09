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
    console.log(`[API Request] ${options.method || 'GET'} ${url}`);
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
    console.error(`[API Network/Logic Error] ${url}:`, error);
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
 * Send Order Email - POST /orders/:id/send-email
 */
export const sendOrderEmail = async (orderId, deliveryDays, status) => {
  return await apiFetch(`/orders/${orderId}/send-email`, {
    method: 'POST',
    body: JSON.stringify({ orderId, deliveryDays, status }),
  });
};

/**
 * Get All Products - GET /products
 */
export const getProducts = async () => {
  return await apiFetch('/products', {
    method: 'GET',
  });
};

/**
 * Add Product - POST /products
 */
export const addProduct = async (productData) => {
  return await apiFetch('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

/**
 * Update Product - PUT /products/:id
 */
export const updateProduct = async (id, productData) => {
  return await apiFetch(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

/**
 * Delete Product - DELETE /products/:id
 */
export const deleteProduct = async (id) => {
  return await apiFetch(`/products/${id}`, {
    method: 'DELETE',
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

/**
 * Update Admin Homepage Config - PUT /admin/homepage
 */
export const updateAdminHomepage = async (configData) => {
  return await apiFetch('/admin/homepage', {
    method: 'PUT',
    body: JSON.stringify(configData),
  });
};

/**
 * Update Order - PUT /orders/:id
 */
export const updateOrder = async (id, orderData) => {
  return await apiFetch(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData),
  });
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  // Clear all atelier related keys
  [localStorage, sessionStorage].forEach(storage => {
    Object.keys(storage).forEach(key => {
      if (key.startsWith('atelier')) storage.removeItem(key);
    });
  });
  window.location.href = '/login';
};