// Authentication service for Ananta Svastha
// This service handles all authentication related API calls

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.anantasvastha.com';

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would make an actual API call
      // const response = await fetch(`${API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      // return await response.json();
      
      // For now, let's simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      if (credentials.email === 'test@example.com' && credentials.password === 'Password123') {
        return {
          success: true,
          message: 'Login successful',
          token: 'sample-jwt-token',
          data: { email: credentials.email }
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login. Please try again.',
      };
    }
  },

  /**
   * Register a new user
   */
  signup: async (userData: SignupData): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would make an actual API call
      // const response = await fetch(`${API_URL}/auth/signup`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      // return await response.json();
      
      // For now, let's simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      return {
        success: true,
        message: 'Account created successfully',
        token: 'sample-jwt-token',
        data: { email: userData.email, name: userData.name }
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'An error occurred during signup. Please try again.',
      };
    }
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would make an actual API call
      // const response = await fetch(`${API_URL}/auth/forgot-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // return await response.json();
      
      // For now, let's simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      return {
        success: true,
        message: 'Password reset instructions have been sent to your email',
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.',
      };
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would make an actual API call
      // const response = await fetch(`${API_URL}/auth/reset-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return await response.json();
      
      // For now, let's simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      if (data.token === 'invalid-token') {
        return {
          success: false,
          message: 'Invalid or expired token',
        };
      }
      
      return {
        success: true,
        message: 'Password has been reset successfully',
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.',
      };
    }
  },

  /**
   * Store authentication token in localStorage
   */
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  /**
   * Get authentication token from localStorage
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  /**
   * Remove authentication token from localStorage
   */
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },

  /**
   * Logout user
   */
  logout: (): void => {
    authService.removeToken();
  }
};
