import { API_URL, API_KEY } from "../config/constant";

/**
 * Resolve Query For Search Path.
 * @param {string} searchTerm 
 */
export const resolveSearchPath = (searchTerm) => {
  return `${API_URL}?apikey=${API_KEY}&s=${searchTerm}`;
}

/**
 * Limit Data to x number.
 * @param {Array} searchQueue 
 * @param {String} value 
 * @param {String} limit 
 * @return {Array} updatedSearchQueue
 */
const _limitSearchQueue = (searchQueue, value, limit) => {
  return searchQueue.length === limit ? [value, ...searchQueue.slice(0, searchQueue.length - 1)] : [value, ...searchQueue];
}

/**
 * Get Data From LocalStorage
 * @param {String} key 
 */
export const getSearchQueue = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

/**
 * Set Data To LocalStorage
 * @param {String} key 
 * @param {String} value 
 */
export const setSearchQueue = (key, value) => {
  let searchQueue = getLocalSearchQueue(key);
  if (!searchQueue.includes(value)) {
    const updatedSearchQueue = _limitSearchQueue(searchQueue, value, 3);
    localStorage.setItem(key, JSON.stringify(updatedSearchQueue));
  }
}