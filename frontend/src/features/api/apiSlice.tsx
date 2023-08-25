import {BaseQueryFn} from "@reduxjs/toolkit/query";
import {createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {Todo} from "../../utils.tsx";

const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string } = {baseUrl: ''}
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
        async ({url, method, data, params}) => {
            try {
                const result = await axios({url: baseUrl + url, method, data, params})
                return {data: result.data}
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
export const apiSlice = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: '/api'
    }),
    tagTypes: ['Todo'],
    endpoints(build) {
        return {
            getTodos: build.query<Todo[], void>({
                query: () => ({url: '/todos', method: 'GET'}),
                providesTags: (result) =>
                    result
                        ? [...result.map(({id}) => ({type: 'Todo' as const, id})), 'Todo']
                        : ['Todo']
            }),
            createTodo: build.mutation<Todo, { plan: string, startTime: string }>({
                query: ({plan, startTime}) => ({
                    url: "/todos",
                    method: "POST",
                    data: {plan, startTime}
                }),
                invalidatesTags: ['Todo']
            }),
            getUpcoming: build.query<Todo[], void>({
                query: () => ({url: '/todos/upcoming', method: 'GET'}),
                providesTags: (result) =>
                    result
                        ? [...result.map(({id}) => ({type: 'Todo' as const, id})), 'Todo']
                        : ['Todo']
            }),
            deleteTodo: build.mutation<void, string>({
                query: (id: string) => ({
                    url: `/todos/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ['Todo']
            }),
            editTodo: build.mutation<void, { id: string, plan: string, startTime: string }>({
                query: ({id, plan, startTime}) => ({
                    url: `/todos/${id}`,
                    method: "PUT",
                    data: {plan, startTime}
                }),
                invalidatesTags: ['Todo']
            }),
            register: build.mutation<void, { username: string, email: string, password: string }>({
                query: ({username, email, password}) => ({
                    url: `/users/register`,
                    method: "POST",
                    data: {username, email, password}
                }),
            }),
            saveToTimedOut: build.mutation<{
                plan: string,
                startTime: string,
                toggleTimer: boolean,
                createdAt: string,
                todoUserId: string
            }, { plan: string, startTime: string, toggleTimer: boolean, createdAt: string, todoUserId: string }>({
                query: ({plan, startTime, toggleTimer, createdAt, todoUserId}) => ({
                    url: `/timedout`,
                    method: "POST",
                    data: {plan, startTime, toggleTimer, createdAt, todoUserId}
                }),
                invalidatesTags: ['Todo']
            }),
            getTimedOut: build.query<Todo[], void>({
                query: () => ({url: '/timedout', method: 'GET'}),
                providesTags: (result) =>
                    result
                        ? [...result.map(({id}) => ({type: 'Todo' as const, id})), 'Todo']
                        : ['Todo']
            }),
        }
    }
})


export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useGetUpcomingQuery,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useRegisterMutation,
    useSaveToTimedOutMutation
} = apiSlice;