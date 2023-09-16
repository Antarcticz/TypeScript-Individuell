// Define a constant key for the local storage
const CART_STORAGE_KEY = '@LS_CART';

// Create a type alias for the storage key
type StorageKey = typeof CART_STORAGE_KEY;

// Function to get data from local storage based on a given key
const getFromLocalStorage = (key: StorageKey) => {
  // Retrieve data from local storage using the provided key
  const data = localStorage.getItem(key);
  // If data exists, parse it from JSON format; otherwise, return null
  return data ? JSON.parse(data) : null;
};

// Function to save data to local storage with a given key
const saveToLocalStorage = (key: StorageKey, data: any) => {
  // Convert the data to a JSON string
  const stringifiedData = JSON.stringify(data);
  // Save the stringified data to local storage using the provided key
  localStorage.setItem(key, stringifiedData);
};

// Function to retrieve cart data from local storage
export const getCartsFromLocalStorage = (): Product[] => {
  // Get cart data from local storage using the defined storage key,
  // or return an empty array if data doesn't exist
  return getFromLocalStorage(CART_STORAGE_KEY) || [];
};

// Function to save cart data to local storage
export const saveCartsToLocalStorage = (carts: Product[]) => {
  // Save the cart data to local storage using the defined storage key
  saveToLocalStorage(CART_STORAGE_KEY, carts);
};

// Function to remove data from local storage based on a given key
export const removeFromLocalStorage = (key: StorageKey) => {
  // Remove data from local storage using the provided key
  localStorage.removeItem(key);
};

// Function to clear all data from local storage
export const clearLocalStorage = () => {
  // Clear all data stored in local storage
  localStorage.clear();
};