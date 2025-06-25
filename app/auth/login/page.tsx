'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: [] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    const newErrors: Record<string, string[]> = {};
    if (!emailValidation.isValid) newErrors.email = emailValidation.errors;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.errors;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    // Implement actual login logic using auth service
    try {
      const response = await import('@/services/auth').then(module => {
        return module.authService.login({
          email: formData.email,
          password: formData.password
        });
      });
        if (response.success && response.token) {
        // Store token and redirect
        localStorage.setItem('auth_token', response.token);
        window.location.href = '/dashboard'; // Redirect to dashboard page
      } else {
        // Show error message
        setErrors({
          general: [response.message || 'Invalid credentials. Please try again.']
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        general: ['An unexpected error occurred. Please try again.']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#334036] mb-2">Welcome Back</h1>
          <p className="text-[#334036]/70">Sign in to your account</p>
        </div>        {/* Form Container */}        <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Messages */}
            {errors.general && errors.general.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general.map((error, index) => (
                  <p key={index} className="text-sm">{error}</p>
                ))}
              </div>
            )}
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#334036] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 bg-white text-[#334036] placeholder-[#334036]/50 transition-all duration-200 focus:outline-none focus:border-[#815C42] rounded-lg ${
                  errors.email?.length ? 'border-red-500' : 'border-[#D7D0C0]'
                }`}
                placeholder="Enter your email"
              />
              {errors.email?.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
              ))}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#334036] mb-2">
                Password
              </label>
              <div className="relative">                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border-2 bg-white text-[#334036] placeholder-[#334036]/50 transition-all duration-200 focus:outline-none focus:border-[#815C42] rounded-lg ${
                    errors.password?.length ? 'border-red-500' : 'border-[#D7D0C0]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#334036]/50 hover:text-[#334036] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password?.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
              ))}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-[#815C42] hover:text-[#334036] transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-[#815C42] text-white font-medium transition-all duration-200 hover:bg-[#6e4f39] focus:outline-none focus:ring-2 focus:ring-[#815C42]/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                loading ? 'cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-[#334036]/70">
              Don't have an account?{' '}
              <Link 
                href="/auth/signup" 
                className="font-medium text-[#815C42] hover:text-[#334036] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}