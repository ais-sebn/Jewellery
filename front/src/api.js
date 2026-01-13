// front/src/api.js

// CRA exposes ONLY variables that start with REACT_APP_
const rawBase = process.env.REACT_APP_API_URL;

// Fail fast so builds don't silently succeed with broken URLs
if (!rawBase) {
  throw new Error(
    "REACT_APP_API_URL is not defined. Set it in Netlify environment variables or .env"
  );
}

// Remove trailing slashes to avoid //api bugs
const API_BASE = rawBase.replace(/\/+$/, "");

// Safe helper to build URLs
export const apiUrl = (path) => {
  if (!path.startsWith("/")) {
    throw new Error("apiUrl path must start with '/'");
  }
  return `${API_BASE}${path}`;
};

export default API_BASE;
