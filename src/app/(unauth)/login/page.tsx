// src/app/(unauth)/login/page.tsx
'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('admin_token', 'fake-jwt-token');
      // 로그인 성공 시 관리자 메인 홈으로 이동
      window.location.href = '/';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLoginSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Tango Body<br/>Super Admin</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">이메일</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-500" 
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">비밀번호</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-blue-500" 
            required 
          />
        </div>
        <button type="submit" className="w-full  bg-blue-600 p-3 font-semibold text-white hover:bg-blue-600/80 cursor-pointer">
          로그인
        </button>
      </form>
    </div>
  );
}