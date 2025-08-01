import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// property shape
export interface PropertyData {
    _id: string;
    propertyName: string;
    rooms: number;
    propertyType: string;
    rent: number;
    location: string;
    propertyImage: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface WishListState {
    wishlist: PropertyData[];
    addToWishlist: (property: PropertyData) => void;
    removeFromWishlist: (id: string) => void;
    clearWishlist: () => void;
    isInWishlist: (id: string) => boolean;
}

export const useWishListStore = create<WishListState>()(
    persist(
        (set, get) => ({
            wishlist: [],
            addToWishlist: (property) => {
                const alreadyExists = get().wishlist.some((item) => item?._id === property?._id)
                if (!alreadyExists) {
                    set((state) => ({
                        wishlist: [...state.wishlist, property]
                    }))
                }
            },

            removeFromWishlist: (id) => {
                set((state) => ({
                    wishlist: state.wishlist.filter((item) => item._id !== id)
                }));
            },

            clearWishlist: () => set({ wishlist: [] }),

            isInWishlist: (id) => get().wishlist.some((item) => item._id === id)
        }),
        {
            name: 'wishlist-storage', 
        }
    )
)