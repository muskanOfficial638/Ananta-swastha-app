// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { validatePassword, validateConfirmPassword } from '@/utils/validation';

// export default function ResetPasswordPage() {
//   const searchParams = useSearchParams();
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string[]>>({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [token, setToken] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const resetToken = searchParams.get('token');
//     setToken(resetToken);
//   }, [searchParams]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: [] }));
//     }
//   };  const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Validate form
//     const passwordValidation = validatePassword(formData.password);
//     const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
    
//     const newErrors: Record<string, string[]> = {};
//     if (!passwordValidation.isValid) newErrors.password = passwordValidation.errors;
//     if (!confirmPasswordValidation.isValid) newErrors.confirmPassword = confirmPasswordValidation.errors;
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setLoading(false);
//       return;
//     }
    
//     // Implement actual password reset logic
//     try {
//       if (!token) {
//         setErrors({
//           general: ['Invalid or missing reset token. Please request a new password reset link.']
//         });
//         setLoading(false);
//         return;
//       }
      
//       const response = await import('@/services/auth').then(module => {
//         return module.authService.resetPassword({
//           token,
//           password: formData.password
//         });
//       });
      
//       if (response.success) {
//         setSuccess(true);
//       } else {
//         setErrors({
//           general: [response.message || 'Failed to reset password. Please try again.']
//         });
//       }
//     } catch (error) {
//       console.error('Password reset failed:', error);
//       setErrors({
//         general: ['An unexpected error occurred. Please try again.']
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Invalid or missing token
//   if (!token) {
//     return (
//       <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
//         </div>
        
//         <div className="relative w-full max-w-md">          <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
            
//             <h1 className="text-2xl font-bold text-[#334036] mb-2">Invalid Reset Link</h1>
//             <p className="text-[#334036]/70 mb-6">
//               This password reset link is invalid or has expired.
//             </p>
            
//             <div className="space-y-4">              <Link 
//                 href="/auth/forgot-password"
//                 className="block w-full py-3 px-4 bg-[#815C42] text-white text-center font-medium rounded-lg transition-all duration-200 hover:bg-[#6e4f39] focus:outline-none focus:ring-2 focus:ring-[#815C42]/30"
//               >
//                 Request New Link
//               </Link>
              
//               <Link 
//                 href="/auth/login"
//                 className="block text-center text-sm text-[#815C42] hover:text-[#334036] transition-colors"
//               >
//                 Back to Sign In
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Success state
//   if (success) {
//     return (
//       <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
//         </div>
        
//         <div className="relative w-full max-w-md">          <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm text-center">
//             <div className="w-16 h-16 bg-[#ABB087]/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#ABB087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
            
//             <h1 className="text-2xl font-bold text-[#334036] mb-2">Password Reset</h1>
//             <p className="text-[#334036]/70 mb-6">
//               Your password has been successfully updated.
//             </p>
//               <Link 
//               href="/auth/login"
//               className="block w-full py-3 px-4 bg-[#815C42] text-white text-center font-medium rounded-lg transition-all duration-200 hover:bg-[#6e4f39] focus:outline-none focus:ring-2 focus:ring-[#815C42]/30"
//             >
//               Sign In with New Password
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#815C42] to-[#334036]"></div>
//       </div>
      
//       <div className="relative w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-[#334036] mb-2">Reset Password</h1>
//           <p className="text-[#334036]/70">Create your new password</p>
//         </div>        {/* Form Container */}
//         <div className="bg-white p-8 border border-[#D7D0C0]/30 rounded-xl shadow-sm">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* General Error */}
//             {errors.general?.map((error, index) => (
//               <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                 {error}
//               </div>
//             ))}

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-[#334036] mb-2">
//                 New Password
//               </label>
//               <div className="relative">                <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 pr-12 border-2 bg-white text-[#334036] placeholder-[#334036]/50 transition-all duration-200 focus:outline-none focus:border-[#815C42] rounded-lg ${
//                     errors.password?.length ? 'border-red-500' : 'border-[#D7D0C0]'
//                   }`}
//                   placeholder="Enter new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#334036]/50 hover:text-[#334036] transition-colors"
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password?.map((error, index) => (
//                 <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
//               ))}
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#334036] mb-2">
//                 Confirm New Password
//               </label>
//               <div className="relative">                <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 pr-12 border-2 bg-white text-[#334036] placeholder-[#334036]/50 transition-all duration-200 focus:outline-none focus:border-[#815C42] rounded-lg ${
//                     errors.confirmPassword?.length ? 'border-red-500' : 'border-[#D7D0C0]'
//                   }`}
//                   placeholder="Confirm new password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#334036]/50 hover:text-[#334036] transition-colors"
//                 >
//                   {showConfirmPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword?.map((error, index) => (
//                 <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
//               ))}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 bg-[#815C42] text-white font-medium transition-all duration-200 hover:bg-[#6e4f39] focus:outline-none focus:ring-2 focus:ring-[#815C42]/30 disabled:opacity-50 disabled:cursor-not-allowed ${
//                 loading ? 'cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Updating password...
//                 </div>
//               ) : (
//                 'Update Password'
//               )}
//             </button>
//           </form>

//           {/* Back to Sign In Link */}
//           <div className="mt-8 text-center">
//             <Link 
//               href="/auth/login" 
//               className="text-sm text-[#815C42] hover:text-[#334036] transition-colors"
//             >
//               ← Back to Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
