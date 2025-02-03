import axios, { AxiosHeaders } from "axios";
import Header from "./header";

//Get request
export const AxGet = async (URL: string, endpoint: string): Promise<any> => {
  const defaultHeaders = Header();
  const config = {
    headers: defaultHeaders,
  };
  return await axios.get(`${URL}${endpoint}`, config);
};

//Post request
export const AxPost = async (
  URL: string,
  endpoint: string,
  data: any,
  headers?: AxiosHeaders
): Promise<any> => {
  const defaultHeaders = Header();
  const combinedHeaders = new AxiosHeaders();

  // Add default headers
  Object.entries(defaultHeaders).forEach(([key, value]) => {
    combinedHeaders.set(key, value);
  });

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (key.includes("Content-Type")) {
        combinedHeaders.delete("Content-Type");
      }

      combinedHeaders.set(key, value);
    });
  }

  const config = {
    headers: combinedHeaders,
    // headers: defaultHeaders,
  };
  return await axios.post(`${URL}${endpoint}`, data, config);
};

//Delete request
export const AxDelete = async (URL: string, endpoint: string): Promise<any> => {
  const defaultHeaders = Header();
  const config = {
    headers: defaultHeaders,
  };
  return await axios.delete(`${URL}${endpoint}`, config);
};

//Put request
export const AxPut = async (
  URL: string,
  endpoint: string,
  data: any
): Promise<any> => {
  const defaultHeaders = Header();
  const config = {
    headers: defaultHeaders,
  };
  return await axios.put(`${URL}${endpoint}`, data, config);
};
