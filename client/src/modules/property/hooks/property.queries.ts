import { useMutation } from "react-query";
import { PostProperty } from "../services/property.services";

export const usePostProperty = () => {
  return useMutation(PostProperty);
};