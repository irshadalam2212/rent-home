export const Endpoints = {
    PostProperty: "/property/create-property",
    GetAllProperty: "/property/all-properties",
    GetPropertyById: `/property/{propertyId}`,
    DeleteProperty: `/property/delete-property/{propertyId}`,
    // UpdateProperty: `/property/update-property/{id}`,
    UpdateProperty: (id: string) => `/property/update-property/${id}`,
}