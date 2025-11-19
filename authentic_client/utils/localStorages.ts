export const setToLocalStorage = (key: string, token: string) => {
  if (!key || !token || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

//get localStorages
export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

//remove from localStorage
export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};