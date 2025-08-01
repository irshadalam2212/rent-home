import { IGetAllUserResponse } from "../models/user.interface";
import { Delete, Get, Post, Put } from "../../../utils/methods";
import { API_BASE_URL } from "../../../../environment";
import { Endpoints } from "./endpoints";

export const GetAllUser =
    async (): Promise<IGetAllUserResponse> => {
        return new Promise((resolve, reject) => {
            Get(API_BASE_URL, Endpoints.GetAllUsers, {})
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject({ error: true, message: error?.response?.data?.message });
                })
        })
    }