
export interface User {
  full_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    id: string;
    full_name: string;
    email: string;
  };
  message: string;
}



