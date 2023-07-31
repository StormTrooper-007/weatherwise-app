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
        }
    }
})


export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useGetUpcomingQuery,
} = apiSlice;