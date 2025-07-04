import { API_BASE_URL } from "../../../../environment";
import { IGetSuccessApiResponse } from "../../../models/shared.model";
import { Delete, Get, Post, Put } from "../../../utils/methods";
import { IGetPropertiesResponse, IGetPropertyById } from "../models/property.models";
import { Endpoints } from "./endpoints";

export const PostProperty =
    async (payload: FormData): Promise<any> => {
        return new Promise((resolve, reject) => {
            Post(API_BASE_URL, Endpoints.PostProperty, payload)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject({ error: true, message: error?.response?.data?.message });
                });
        });
    };


export const GetAllProperty =
    async (): Promise<IGetPropertiesResponse> => {
        return new Promise((resolve, reject) => {
            Get(API_BASE_URL, Endpoints.GetAllProperty, {})
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject({ error: true, message: error?.response?.data?.message });
                })
        })
    }

export const GetPropertyById =
    async (propertyId: string): Promise<IGetPropertyById> => {
        return new Promise((resolve, reject) => {
            Get(API_BASE_URL, Endpoints.GetPropertyById, {
                propertyId: propertyId
            })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject({ error: true, message: error?.response?.data?.message });
                })
        })
    }

export const DeleteProperty = (propertyId: string) => {
    return new Promise<any>((resolve, reject) => {
        Delete(API_BASE_URL, Endpoints.DeleteProperty, { propertyId: propertyId })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject({ error: true, message: error?.response?.data?.message })
            })
    })
}

export const UpdatePropertyById = async ({
    formData,
    propertyId,
}: {
    formData: FormData;
    propertyId: string;
}): Promise<IGetSuccessApiResponse> => {
    return new Promise((resolve, reject) => {
        Put(API_BASE_URL, Endpoints.UpdateProperty(propertyId), formData)
            .then((response) => resolve(response.data))
            .catch((error) =>
                reject({ error: true, message: error?.response?.data?.message })
            );
    });
};
