import { useMutation, useQuery } from "react-query";
import { GetAllProperty, PostProperty } from "../services/property.services";

export const usePostProperty = () => {
  return useMutation(PostProperty);
};

export const useGetAllProperty = () => {
  return useQuery(['qGetAllProperty'], () => GetAllProperty(), {
    refetchOnWindowFocus: false,
  })
}