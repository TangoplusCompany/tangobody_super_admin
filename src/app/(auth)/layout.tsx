'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

// Next.js의 내장 AppRouterInstance 타입을 추출하기 위해 AppRouterInstance 가져오기
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import HeaderLayout from './HeaderLayout';

const sideTabs = [
  { title: "공지사항", url: "/notice" },
  { title: "전체 측정", url: "/measure" },
  { title: "전체 센터", url: "/center" },
  { title: "센터별 매니저 관리", url: "/coach" },
  { title: "전체 장치", url: "/device" },
];

// 💡 1. any를 완전히 치우고 정확한 타입 매핑 (router에는 AppRouterInstance 적용)
interface SidebarContentProps {
  pathname: string;
  router: AppRouterInstance;
  handleLogout: () => void;
  onCloseSidebar: () => void; // 💡 메뉴 클릭 시 사이드바를 닫기 위한 함수 추가
}

// 컴포넌트 외부 배치 구조 유지
const SidebarContent = ({ pathname, router, handleLogout, onCloseSidebar }: SidebarContentProps) => (
  <aside className="w-64 bg-blue-950 text-white flex flex-col justify-between h-full shrink-0">
    <div>
      <button 
        onClick={() => {
          onCloseSidebar(); // 이동 전 사이드바 닫기
          router.push('/');
        }} 
        className="w-full text-center block py-5 px-4 font-bold text-lg tracking-wide text-white cursor-pointer hover:text-gray-400 transition whitespace-pre-line"
      >
        {`Tango Body\n슈퍼 관리자`}
      </button>
      
      <nav className="mt-6 px-4 space-y-1.5">
        {sideTabs.map((tab) => {
          const isActive = pathname === tab.url;
          return (
            <button
              key={tab.url}
              onClick={() => {
                // 💡 2. 렌더링 도중(useEffect)이 아닌, 사용자가 버튼을 '클릭한 시점'에 사이드바를 미리 닫아버립니다.
                onCloseSidebar(); 
                router.push(tab.url);
              }}
              className={`w-full text-left block py-3 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-200/70 hover:bg-blue-900/60 hover:text-white'
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </nav>
    </div>

    <div className="p-4 border-t border-blue-900">
      <button 
        onClick={handleLogout}
        className="w-full py-2.5 px-4 rounded-lg bg-red-600 text-sm font-medium text-white hover:bg-red-700 transition cursor-pointer"
      >
        로그아웃
      </button>
    </div>
  </aside>
);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token || !isAuthenticated) {
      router.replace('/login'); 
    }
  }, [isAuthenticated, router]);

  // ❌ 에러를 유발하던 useEffect [pathname] 블록은 완전히 삭제했습니다!

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    return <div className="p-8 text-center font-medium">인증 확인 중...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 w-full overflow-hidden">
      
      {/* ── [PC 전용] ── */}
      <div className="hidden lg:block h-full">
        {/* PC 버전은 어차피 상시 노출이므로 onCloseSidebar에 빈 함수인 () => {} 를 주어도 무방합니다. */}
        <SidebarContent pathname={pathname} router={router} handleLogout={handleLogout} onCloseSidebar={() => {}} />
      </div>

      {/* ── [모바일 전용] 슬라이딩 오버레이 ── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="h-full" onClick={(e) => e.stopPropagation()}>
            {/* 모바일 버전은 메뉴 클릭 시 닫히도록 setIsSidebarOpen(false)를 내려줍니다. */}
            <SidebarContent 
              pathname={pathname} 
              router={router} 
              handleLogout={handleLogout} 
              onCloseSidebar={() => setIsSidebarOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* ── [우측 메인 영역] ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <HeaderLayout/>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}