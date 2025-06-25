'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
      
      if (!isAuth && !pathname.startsWith('/auth')) {
        // Redirect to login page if not authenticated and trying to access protected route
        router.replace('/auth/login');
      }
    };
    
    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    // Show loading state
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#815C42]"></div>
          <p className="mt-4 text-[#334036]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !pathname.startsWith('/auth')) {
    // This shouldn't display as we're redirecting in the useEffect
    return null;
  }

  // User is authenticated or trying to access auth pages
  return <>{children}</>;
}
