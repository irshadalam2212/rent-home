export interface IPostUserPayload {
    userName: string,
    email: string,
    password: string
}

export interface IUserRegistrationResponse {
    statusCode: number;
    data: {
      _id: string;
      userName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    message: string;
    success: number;
  }
  