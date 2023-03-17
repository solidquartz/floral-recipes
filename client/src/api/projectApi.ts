import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Project } from 'src/types';
import { baseQuery } from './api';

// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery,
  tagTypes: ['project'],
  endpoints: builder => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => 'projects',
      providesTags: (projects = []) =>
        projects.map(p => ({
          type: 'project',
          id: p.id.toString()
        } as const
      )).concat({ type: 'project' as const, id: 'LIST' })
    }),
    getProjectById: builder.query<Project, string>({
      query: id => `projects/${id}`
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProjectsQuery, useGetProjectByIdQuery } = projectApi;