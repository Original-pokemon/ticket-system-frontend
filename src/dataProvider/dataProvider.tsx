import { fetchUtils, withLifecycleCallbacks, Options } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import { config } from "../config";

const httpClient: (url: any, options?: fetchUtils.Options | undefined) => Promise<{
  status: number;
  headers: Headers;
  body: string;
  json: any;
}> = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
    });
  }
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
}

export const dataProvider = jsonServerProvider(config.VITE_BACKEND_URL, httpClient);


