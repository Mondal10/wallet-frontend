// Save value
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Get value
export const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

// Remove value
export const removeItem = (key) => {
    localStorage.removeItem(key);
};
