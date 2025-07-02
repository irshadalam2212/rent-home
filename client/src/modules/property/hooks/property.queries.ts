import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteProperty, GetAllProperty, GetPropertyById, PostProperty, UpdatePropertyById } from "../services/property.services";

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

export const useDeleteProperty = () => {
  const queryClient = useQueryClient()
  return useMutation(DeleteProperty, {
    onSuccess: () => {
      queryClient.invalidateQueries('qGetAllProperty')
    }
  })
}

export const useUpdateProperty = () => {
  return useMutation(UpdatePropertyById)
}