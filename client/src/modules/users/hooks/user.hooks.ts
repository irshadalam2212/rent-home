import { useQuery } from "react-query"
import { GetAllUser } from "../services/user.services"

export const useGetAllUsers = () => {
    return useQuery(['qGetAllUsers'], () => GetAllUser(), {
        refetchOnWindowFocus: false,
    })
}