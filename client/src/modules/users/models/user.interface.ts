import { IGetApiResponse } from "../../../models/shared.model";

interface IGetAllUser {
    _id: string,
    name: string,
    email: string,
    userRole: string,
    createdAt: string,
    updatedAt: string
}

export interface IGetAllUserResponse extends IGetApiResponse {
    data: IGetAllUser[]
}

interface userRole {
    label: string,
    value: string
}

export interface IPostUserData {
    name: string,
    email: string,
    userRole: userRole
}