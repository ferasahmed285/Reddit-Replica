/**
 * Shared utility functions for the server
 */

/**
 * Calculate time ago string from a date
 * @param {Date} date - The date to calculate from
 * @returns {string} Human-readable time ago string
 */
const getTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return `${Math.floor(seconds / 2592000)} months ago`;
};

/**
 * Format large numbers with k/M suffix
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
const formatCount = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
};

module.exports = { getTimeAgo, formatCount };
