import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const API_URL = 'http://localhost:3500'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (data) => data.sort(
                (a,b) => b.id - a.id
            ),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        })
    })
})


export {
    apiSlice,
}

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = apiSlice