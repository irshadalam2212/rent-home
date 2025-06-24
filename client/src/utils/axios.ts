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
  const isFormData = data instanceof FormData;

  const combinedHeaders = new AxiosHeaders();

  if (!isFormData) {
    // Only apply default headers when not sending FormData
    const defaultHeaders = Header();
    Object.entries(defaultHeaders).forEach(([key, value]) => {
      combinedHeaders.set(key, value);
    });
  }

  // Apply custom headers unless it's a FormData with Content-Type
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (key.toLowerCase() === "content-type" && isFormData) {
        // Skip setting content-type for FormData
        return;
      }

      combinedHeaders.set(key, value);
    });
  }

  const config = {
    headers: combinedHeaders,
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
