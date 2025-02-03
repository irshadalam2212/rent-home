import { useMutation } from "react-query";
import { PostFetchUser } from "../services/login.service";


export const usePostFetchUser = () => {
  return useMutation(PostFetchUser);
};
