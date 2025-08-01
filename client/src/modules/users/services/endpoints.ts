export const Endpoints = {
    GetAllUsers: "/users",
    GetUserById: "/users/{userId}",
    UpdateUser: (id: string) =>  `/users/update-user/${id}`
}