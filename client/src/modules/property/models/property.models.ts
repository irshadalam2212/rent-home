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