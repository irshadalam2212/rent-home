import { useMutation } from "react-query";
import { RegisterUser } from "../services/signup.services";


export const useRegisteruser = () => {
  return useMutation(RegisterUser);
};
