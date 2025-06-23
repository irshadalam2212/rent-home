import { API_BASE_URL } from "../../../../environment";
import { Post } from "../../../utils/methods";
import { Endpoints } from "./endpoints";

export const PostProperty = async (payload: FormData): Promise<any> => {
    return new Promise((resolve, reject) => {
        Post(API_BASE_URL, Endpoints.PostProperty, payload)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject({ error: true, message: error.message})
        })
    })
}