import { useMutation, useQuery } from "react-query";
import { GetAllProperty, GetPropertyById, PostProperty } from "../services/property.services";

export const usePostProperty = () => {
  return useMutation(PostProperty);
};

export const useGetAllProperty = () => {
  return useQuery(['qGetAllProperty'], () => GetAllProperty(), {
    refetchOnWindowFocus: false,
  })
}

export const useGetPropertById = (propertyId: string) => {
  return useQuery(['qGetPropertyById', propertyId], () => GetPropertyById(propertyId), {
    refetchOnWindowFocus: false,
    enabled: !!propertyId
  })
}