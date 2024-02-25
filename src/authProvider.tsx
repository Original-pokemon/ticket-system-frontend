import { AuthProvider, fetchUtils } from "react-admin";
import jsonServerProvider from 'ra-data-json-server'

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      // const response = await fetch(request)
      const response = await fetchUtils.fetchJson('http://localhost/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.body);
      }
      localStorage.setItem('auth', username);
    } catch {
      throw new Error('Network error');
    }
  },
  logout: async () => {
    try {
      const response = await fetchUtils.fetchJson('http://localhost/logout', {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
      });
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
