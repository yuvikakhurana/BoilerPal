import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method: 'POST',
              body: data,
            }),
           }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
           }),
        sendForgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/password-reset`,
                method: 'POST',
                body: data,
            }),
        }),
        setNewPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/password-reset/${data.id}/${data.token}`,
                method: "POST",
                body: data
            }),
        }),
        getReservations: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/reservation`,
                method: "GET"
            }),
        }),
        createReservation: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/reservation`,
                method: "POST",
                body: data
            }),
        }),
        deleteReservation: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/reservation`,
                method: "DELETE",
                body: data
            })
        }),
        getClasses: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/class`,
                method: "GET"
            }),
        }),
        createClass: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/class`,
                method: "POST",
                body: data
            }),
        }),
        deleteClass: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/class`,
                method: "DELETE",
                body: data
            })
        }),
        editClass: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/class`,
                method: "PUT",
                body: data
            })
        }),
        getEvents: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/event`,
                method: "GET"
            }),
        }),
        createEvent: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/event`,
                method: "POST",
                body: data
            }),
        }),
        deleteEvent: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/event`,
                method: "DELETE",
                body: data
            })
        }),
        editEvent: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/event`,
                method: "PUT",
                body: data
            })
        }),
        getAllItems: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/item`,
                method: "GET"
            })
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/todo`,
                method: "POST",
                body: data
            }),
        }),
        deleteTodo: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/todo`,
                method: "DELETE",
                body: data
            })
        }),
        editTodo: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/todo`,
                method: "PUT",
                body: data
            })
        }),
        getTodos: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/todo`,
                method: "GET"
            })
        }),
        toggleReminder: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/reminder`,
                method: "POST",
                body: data
            })
        }),
        getReminderStatus: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/reminder`,
                method: "GET"
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useSendForgotPasswordMutation,
    useSetNewPasswordMutation,
    useGetReservationsMutation,
    useCreateReservationMutation,
    useDeleteReservationMutation,
    useCreateClassMutation,
    useDeleteClassMutation,
    useEditClassMutation,
    useCreateEventMutation,
    useDeleteEventMutation,
    useEditEventMutation,
    useGetAllItemsMutation,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useGetTodosMutation,
    useToggleReminderMutation
} = usersApiSlice;