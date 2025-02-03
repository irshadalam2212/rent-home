import { Post } from "../../../utils/methods";
import { IFetchUserPayload, IFetchUserResponse } from "../models/login.interface";
import { Endpoints } from "./endpoints";
import { API_BASE_URL } from "../../../../environment";

export const PostFetchUser = async (
  payload: IFetchUserPayload
): Promise<IFetchUserResponse> => {
  return new Promise((resolve, reject) => {
    Post(API_BASE_URL, Endpoints.FetchUser, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({ error: true, message: error.message });
      });
  });
};
