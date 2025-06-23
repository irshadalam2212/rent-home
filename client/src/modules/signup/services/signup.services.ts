import { API_BASE_URL } from "../../../../environment";
import { Post } from "../../../utils/methods";
import { IPostUserPayload, IUserRegistrationResponse } from "../models/signup.interface";
import { Endpoints } from "./endpoints";

export const RegisterUser = async (
  payload: IPostUserPayload
): Promise<IUserRegistrationResponse> => {
  return new Promise((resolve, reject) => {
    Post(API_BASE_URL, Endpoints.RegisterUser, payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({ error: true, message: error.message });
      });
  });
};