// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 브라우저 로컬스토리지에서 기존 로그인 토큰이 있는지 확인
    const token = localStorage.getItem('admin_token');
    if (token) {
      // 가짜 유저 데이터 세팅 (실제 서비스에서는 API 연동)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ id: '1', name: '최고관리자', role: 'SUPER_ADMIN' });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('admin_token', token);
    setUser({ id: '1', name: '최고관리자', role: 'SUPER_ADMIN' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // 인증 상태를 확인하는 동안 잠깐 대기
  if (loading) {
    return <div className="p-8 text-center font-medium">로딩 중...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}