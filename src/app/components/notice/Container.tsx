// src/components/notice/NoticeContainer.tsx
'use client';

import { useState } from 'react';
import DataList, { Column } from '../common/DataList';
import NoticeAddForm from './AddForm';
import NoticeViewer from './Viewer';
import { INoticeItem, NOTICE_TYPE_LIST } from '@/app/types/notice';



export default function NoticeContainer() {
  const [selectedNotice, setSelectedNotice] = useState<INoticeItem | undefined>(undefined);  
  const dummyNotices: INoticeItem[] = [
    { id: 1, title: "[점검] 서버 통합 정기 점검 안내", author: "최고관리자", createdAt: "2026-06-18", notice_type: 0 },
    { id: 2, title: "센터 관리 기능 업데이트 공지", author: "시스템운영자", createdAt: "2026-06-15", notice_type: 1 },
    { id: 3, title: "개인정보처리방침 변경 안내", author: "보안팀", createdAt: "2026-05-30", notice_type: 1 },
  ];
  const NOTICE_COLOR_MAP: Record<0 | 1 | 2 | 3, string> = {
    0: 'bg-red-100 text-red-700',         // 🚨 긴급 오류 수정 (빨간색)
    1: 'bg-blue-100 text-blue-700',       // 📢 일반 공지 (파란색)
    2: 'bg-emerald-100 text-emerald-700', // ✨ 새로운 기능 (초록색)
    3: 'bg-amber-100 text-amber-700',     // 🎁 홍보 (주황색)
  };
  const columns: Column<INoticeItem>[] = [
    { 
      header: "번호", 
      accessor: "id" 
    },
    { 
      header: "제목", 
      accessor: (item) => (
        <div className="flex items-center gap-2">
          {item && (
            <span 
              className={`text-xs px-2 py-0.5 rounded font-bold shrink-0 ${
                // 💡 Record 객체에서 현재 idx에 맞는 색상을 가져오고, 없으면 기본 파란색 적용
                NOTICE_COLOR_MAP[item.notice_type] || 'bg-blue-100 text-blue-700'
              }`}
            >
              {NOTICE_TYPE_LIST.find((meta) => meta.idx === item.notice_type)?.label || '일반 공지'}
            </span>
          )}
          <span className="font-medium text-gray-900 truncate max-w-md">{item.title}</span>
        </div>
      )
    },
    { 
      header: "작성자", 
      accessor: "author" 
    },
    { 
      header: "등록일", 
      accessor: "createdAt" 
    },
    {
      header: "관리",
      accessor: (item) => (
        // <button 
        //   onClick={(e) => {
        //     e.stopPropagation(); // 행 클릭 이벤트 전파 방지
        //     alert(`수정 창 열기: ${item.id}`);
        //   }}
        //   className="text-xs bg-gray-100 hover:bg-gray-200 border text-gray-700 px-3 py-1 rounded font-medium transition cursor-pointer"
        // >
        //   기타 기능
        // </button>
        <div></div>
      )
    }
  ];

  const handleRowClick = (item: INoticeItem) => {
    setSelectedNotice(item)
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className='text-gray-900'>
          총 <span className='font-bold text-gray-950'>{dummyNotices.length}</span>건
        </div>
        <NoticeAddForm />
      </div>

      {/* 공통 테이블 사용 */}
      <DataList data={dummyNotices} columns={columns} onRowClick={handleRowClick} />

      {selectedNotice && (
        <NoticeViewer
          notice={selectedNotice} 
          onClose={() => setSelectedNotice(undefined)} // 닫으면 다시 null로 비워줌
        />
      )}
    </div>
  );
}