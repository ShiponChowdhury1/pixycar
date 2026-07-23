import { baseApi } from '../../api/baseApi';
import type {
  ThreadListResponse,
  ThreadMessagesResponse,
} from './communicationApi.types';

export const communicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.query<ThreadListResponse, void>({
      query: () => '/communication/threads/',
      providesTags: ['Communication'],
    }),
    getThreadMessages: builder.query<ThreadMessagesResponse, number | string>({
      query: (threadId) => `/communication/threads/${threadId}/messages/`,
      providesTags: (_res, _err, threadId) => [{ type: 'Communication', id: threadId }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetThreadsQuery,
  useGetThreadMessagesQuery,
} = communicationApi;
