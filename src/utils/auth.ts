const accessTokenKey = "accessToken";
const codeVerifierKey = "codeVerifier";

export const getStoredAccessToken = () => localStorage.getItem(accessTokenKey) || undefined;
export const setStoredAccessToken = (accessToken: string) =>
  localStorage.setItem(accessTokenKey, accessToken);
export const resetStoredAccessToken = () => localStorage.removeItem(accessTokenKey);

export const getStoredCodeVerifier = () => localStorage.getItem(codeVerifierKey) || undefined;
export const setStoredCodeVerifier = (codeVerifier: string) =>
  localStorage.setItem(codeVerifierKey, codeVerifier);
