export type UserRole = 'SELLER' | 'DEALER';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
  full_name?: string;
  name?: string;
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  tokens: {
    refresh: string;
    access: string;
  };
  user: AuthUser;
}

export interface SellerRegisterRequest {
  email: string;
  password?: string;
  confirm_password?: string;
  name: string;
  phone: string;
  address: string;
  zip_code: string;
}

export interface SellerRegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    role: 'SELLER';
  };
}

export interface DealerRegisterRequest {
  email: string;
  password?: string;
  confirm_password?: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  zip_code: string;
  dealer_license_number: string;
}

export interface DealerRegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    role: 'DEALER';
  };
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  otp_type?: string;
}

export interface VerifyOtpResponse {
  message?: string;
  tokens?: {
    refresh: string;
    access: string;
  };
  user?: AuthUser;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  new_password?: string;
  confirm_password?: string;
}

export interface ResetPasswordResponse {
  message: string;
}

