import { parseTemplate } from "url-template";
import { AxDelete, AxGet, AxPost, AxPut } from "./axios";
import { AxiosHeaders } from "axios";

export const Get = async (
  url: string,
  endpoint: string,
  data: Record<string, any>
): Promise<any> => {
  const expandedUrl = parseTemplate(endpoint).expand(data);
  return await AxGet(url, expandedUrl);
};

export const Post = async (
  url: string,
  endpoint: string,
  data: any,
  headers?: AxiosHeaders
): Promise<any> => {
  return await AxPost(url, endpoint, data, headers);
};

export const Put = async (
  url: string,
  endpoint: string,
  data: any
): Promise<any> => {
  return await AxPut(url, endpoint, data);
};

export const Delete = async (
  url: string,
  endpoint: string,
  data: Record<string, any>
): Promise<any> => {
  const expandedUrl = parseTemplate(endpoint).expand(data);
  return await AxDelete(url, expandedUrl);
};
