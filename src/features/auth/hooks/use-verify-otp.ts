"use client";

import { useVerifyOtpMutation } from "@/store/features/auth/authApi";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useCallback } from "react";
import type { VerifyOtpRequest, VerifyOtpResponse } from "@/store/features/auth/authApi.types";

export function useVerifyOtp() {
  const [verifyOtpMutation, { isLoading }] = useVerifyOtpMutation();
  const dispatch = useAppDispatch();

  const mutate = useCallback(async (
    data: VerifyOtpRequest,
    options?: { onSuccess?: (data: VerifyOtpResponse) => void; onError?: (error: Error) => void }
  ) => {
    try {
      const response = await verifyOtpMutation(data).unwrap();
      // If tokens and user details are returned upon verification, log the user in immediately
      if (response.tokens && response.user) {
        dispatch(
          setCredentials({
            accessToken: response.tokens.access,
            refreshToken: response.tokens.refresh,
            user: response.user,
          })
        );
      }
      options?.onSuccess?.(response);
    } catch (err: any) {
      let errorMsg = "OTP verification failed. Please check the code and try again.";
      if (err?.data) {
        const data = err.data;
        if (typeof data.detail === 'string') {
          errorMsg = data.detail;
        } else if (Array.isArray(data.detail) && data.detail.length > 0) {
          errorMsg = data.detail[0];
        } else if (typeof data.message === 'string') {
          errorMsg = data.message;
        } else if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
          errorMsg = data.non_field_errors[0];
        } else {
          for (const key in data) {
            const val = data[key];
            if (Array.isArray(val) && val.length > 0) {
              errorMsg = `${key}: ${val[0]}`;
              break;
            } else if (typeof val === 'string') {
              errorMsg = `${key}: ${val}`;
              break;
            }
          }
        }
      } else if (err?.message) {
        errorMsg = err.message;
      }
      options?.onError?.(new Error(errorMsg));
    }
  }, [verifyOtpMutation, dispatch]);

  return { mutate, isPending: isLoading };
}
