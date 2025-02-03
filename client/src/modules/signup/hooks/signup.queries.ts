import { useMutation } from "react-query";
import { RegisterUser } from "../services/signup.service";


export const useRegisteruser = () => {
  return useMutation(RegisterUser);
};
