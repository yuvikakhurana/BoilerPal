import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/rooms';

export const roomsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRooms: builder.mutation({
            query: () => ({
                url: `${USERS_URL}`,
                method: 'GET',
            }),
        }),
    })
})

export const {
    useGetRoomsMutation
} = roomsApiSlice;