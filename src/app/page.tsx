'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/src/lib/auth';
import LoadingSpinner from '../components/layout/loader-spinner';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    ) 
}
