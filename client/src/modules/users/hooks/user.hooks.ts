import { useMutation, useQuery } from "react-query"
import { GetAllUser, GetUserById, UpdateUserById } from "../services/user.services"

export const useGetAllUsers = () => {
    return useQuery(['qGetAllUsers'], () => GetAllUser(), {
        refetchOnWindowFocus: false,
    })
}

export const useGetUserById = (userId: string) => {
    return useQuery(['qGetUserById', userId], () => GetUserById(userId), {
        refetchOnWindowFocus: false,
        enabled: !!userId
    })
}

export const useUpdateUser = () => {
  return useMutation(UpdateUserById)
}