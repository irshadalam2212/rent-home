import { IGetAllUserResponse, IGetUserByIdResponse, IPutUserPayload } from "../models/user.interface";
import { Get, Put } from "../../../utils/methods";
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

export const GetUserById = async (userId: string): Promise<IGetUserByIdResponse> => {
    return new Promise((resolve, reject) => {
        Get(API_BASE_URL, Endpoints.GetUserById, { userId: userId })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject({ error: true, message: error?.response?.data?.message });
            })
    })
}

export const UpdateUserById = async ({
    payload,
    userId,
}: {
    payload: IPutUserPayload;
    userId: string;
}): Promise<any> => {
    return new Promise((resolve, reject) => {
        Put(API_BASE_URL, Endpoints.UpdateUser(userId), payload)
            .then((response) => resolve(response.data))
            .catch((error) =>
                reject({ error: true, message: error?.response?.data?.message })
            );
    });
};