export interface IPostUserPayload {
    name: string,
    email: string,
    password: string
}

export interface IUserRegistrationResponse {
    statusCode: number;
    data: {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    message: string;
    success: number;
  }
  