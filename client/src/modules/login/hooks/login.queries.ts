import { useMutation } from "react-query";
import { PostFetchUser } from "../services/login.services";


export const usePostFetchUser = () => {
  return useMutation(PostFetchUser);
};
