import { IGetApiResponse } from "../../../models/shared.model";

interface IGetUser {
    _id: string,
    name: string,
    email: string,
    userRole: string,
    createdAt: string,
    updatedAt: string
}

export interface IGetAllUserResponse extends IGetApiResponse {
    data: IGetUser[]
}

interface userRole {
    label: string,
    value: string
}

export interface IPostUserFormData {
    name: string,
    email: string,
    userRole: userRole | null
}

export interface IGetUserByIdResponse extends IGetApiResponse {
    data: IGetUser
}

export interface IPutUserPayload {
    name: string,
    email: string,
    userRole: string
}