import { baseApi } from '../../api/baseApi';
import type {
  LoginRequest,
  LoginResponse,
  SellerRegisterRequest,
  SellerRegisterResponse,
  DealerRegisterRequest,
  DealerRegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from './authApi.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/accounts/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerSeller: builder.mutation<SellerRegisterResponse, SellerRegisterRequest>({
      query: (data) => ({
        url: '/accounts/register/seller/',
        method: 'POST',
        body: data,
      }),
    }),
    registerDealer: builder.mutation<DealerRegisterResponse, DealerRegisterRequest>({
      query: (data) => ({
        url: '/accounts/register/dealer/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: '/accounts/verify-otp/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterSellerMutation,
  useRegisterDealerMutation,
  useVerifyOtpMutation,
} = authApi;
