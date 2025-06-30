import { IGetApiResponse } from "../../../models/shared.model";
export interface IPostPropertyPayload {
    propertName: string;
    rooms: number;
    propertyType: string;
    rent: number;
    location: string;
    description: string;
    propertyImage: any
}

export interface IGetPropertyValue {
    propertyName: string
    rooms: number
    propertyType: string
    rent: number
    location: string
    description: string
    propertyImage: any 
}


export interface IGetPropertiesResponse extends IGetApiResponse {
    data: {
        _id: string,
        propertyName: string,
        rooms: number,
        propertyType: string,
        rent: number,
        location: string,
        propertyImage: string,
        description: string,
        createdAt: string,
        updatedAt: string,

    }[]
}

export interface IGetPropertyById extends IGetApiResponse {
    data: {
        _id: string,
        propertyName: string,
        rooms: number,
        propertyType: string,
        rent: number,
        location: string,
        propertyImage: string,
        description: string,
        createdAt: string,
        updatedAt: string
    }
}