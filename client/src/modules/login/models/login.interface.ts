export interface IFetchUserPayload {
    email: string,
    password: string
}

export interface IFetchUserResponse {
    statusCode: number;
    data: {
        user: {
            _id: string;
            userName: string;
            email: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    };
    message: string;
    success: number;
}
