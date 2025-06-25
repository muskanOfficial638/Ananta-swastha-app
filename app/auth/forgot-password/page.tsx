'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate email
    const emailValidation = validateEmail(email);
    
    if (!emailValidation.isValid) {
      setErrors(emailValidation.errors);
      setLoading(false);
      return;
    }
    
    // Implement actual password reset logic
    try {
      const response = await import('@/services/auth').then(module => {
        return module.authService.forgotPassword(email);
      });
      
      if (response.success) {
        setSubmitted(true);
      } else {
        setErrors([response.message || 'Something went wrong. Please try again.']);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
        </div>
        
        <div className="relative w-full max-w-md">          {/* Success Message */}
          <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-[#ABB087]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#ABB087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-[#334036] mb-2">Check Your Email</h1>
            <p className="text-[#334036]/70 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-[#334036]/60">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="text-[#815C42] hover:text-[#334036] transition-colors underline"
                >
                  try again
                </button>
              </p>
                <Link 
                href="/auth/login"
                className="block w-full py-3 px-4 bg-[#815C42] text-white text-center font-medium rounded-lg transition-all duration-200 hover:bg-[#6e4f39] focus:outline-none focus:ring-2 focus:ring-[#815C42]/30"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#334036] mb-2">Forgot Password?</h1>
          <p className="text-[#334036]/70">Enter your email to reset your password</p>
        </div>        {/* Form Container */}
        <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 bg-white text-[#334036] placeholder-[#334036]/50 transition-all duration-200 focus:outline-none focus:border-[#815C42] rounded-lg ${
                  errors.length ? 'border-red-500' : 'border-[#D7D0C0]'
                }`}
                placeholder="Enter your email address"
              />
              {errors.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
              ))}
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
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Sign In Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/auth/login" 
              className="text-sm text-[#815C42] hover:text-[#334036] transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}