'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import MainContainer from '../../components/main/Container';

// 홈화면임
export default function AdminMainPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    return null; 
  }

  // 로그인 상태일 때만 실제 관리자 홈화면을 보여줌
  return <MainContainer />;
}