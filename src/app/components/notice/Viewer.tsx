// src/components/notice/NoticeViewerContainer.tsx
'use client';

import { INoticeItem } from '@/app/types/notice';

interface NoticeViewerContainerProps {
  notice: INoticeItem;
  onClose: () => void; // 💡 깔끔하게 함수 타입 지정
}

export default function NoticeViewer({ notice, onClose }: NoticeViewerContainerProps) {
  return (
    /* ── 1. 부모가 렌더링하는 순간 즉시 뜨는 전체 화면 모달 레이아웃 ── */
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      // 배경을 누르면 닫히게 하고 싶다면 여기에 onClose()를 연결해도 됩니다. 현재는 X 버튼으로만 닫히게 처리.
    >
      {/* ── 2. 읽기 전용 다이얼로그 껍데기 (div로 선언, form 아님) ── */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* 우측 상단 X (닫기) 버튼 */}
        <button 
          type="button"
          onClick={onClose} // 💡 부모의 상태를 null로 치워버리는 기능 수행
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── 헤더 영역: 제목 및 상세 정보 ── */}
        <div className="border-b pb-4 space-y-2">
          <div className="flex items-center gap-2">
            {notice.notice_type && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-bold">{notice.notice_type}</span>
            )}
            <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>
          </div>
          <div className="flex gap-4 text-xs text-gray-400 font-medium">
            <p>작성자: <span className="text-gray-600">{notice.author}</span></p>
            <p>등록일: <span className="text-gray-600">{notice.createdAt}</span></p>
          </div>
        </div>

        {/* ── 본문 내용 영역 ── */}
        <div className="min-h-50 bg-gray-50/50 rounded-lg p-6 border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
          {/* 실제 데이터 구조에 맞게 매핑 (예: notice.content) */}
          {notice.title}의 상세 내용이 이곳에 뿌려집니다. 고유 ID: {notice.id}
        </div>

        {/* ── 하단 제어 버튼 영역 ── */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-600/80 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow transition cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}