import { AuthProvider, fetchUtils } from "react-admin";
import { config } from "./config";

const baseUrl = config.VITE_BACKEND_URL

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const options: fetchUtils.Options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
    }

    try {
      const response = await fetchUtils.fetchJson(baseUrl + '/login', options);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
      }
      localStorage.setItem('auth', username);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Network error');
    }
  },
  logout: async () => {
    const options: fetchUtils.Options = {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
    }

    try {
      const response = await fetchUtils.fetchJson(baseUrl + '/logout', options);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
      }
    } catch {
      throw new Error('Network error');
    }
    localStorage.removeItem("auth");
  },
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
