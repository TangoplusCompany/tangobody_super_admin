// src/components/notice/AddForm.tsx
'use client';

import { useAuth } from '@/app/context/AuthContext';
import { NoticeType } from '@/app/types/notice';
import { NOTICE_TEMPLATES } from '@/app/util/noticeTemplate';
import React, { useState, useEffect } from 'react';

interface ICenter {
  id: string;
  name: string;
}
const NOTICE_TYPE_LABELS: Record<NoticeType, string> = {
  EMERGENCY: '🚨 긴급 오류 수정',
  GENERAL: '📢 일반 공지',
  FEATURE: '✨ 새로운 기능',
  PROMOTION: '🎁 홍보',
};

const DUMMY_CENTERS: ICenter[] = [
  { id: 'c1', name: '강남 메인 센터' },
  { id: 'c2', name: '부산 서면 센터' },
  { id: 'c3', name: '광주 상무 센터' },
];

const LOCAL_STORAGE_KEY = 'pending_notice_data';

const getInitialValue = (key: string, defaultValue: unknown) => {
  if (typeof window === 'undefined') return defaultValue;
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!savedData) return defaultValue;
  try {
    const parsed = JSON.parse(savedData);
    return parsed && typeof parsed === 'object' && parsed[key] !== undefined ? parsed[key] : defaultValue;
  } catch (e) {
    console.log(e)
    return defaultValue;
  }
};

export default function AddForm() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 💡 1. 전역 로그인 정보에서 현재 관리자 데이터 가져오기
  const { user } = useAuth(); 
  const [noticeType, setNoticeType] = useState<NoticeType>('GENERAL');

  const [title, setTitle] = useState<string>(() => getInitialValue('savedTitle', '') as string);
  const [content, setContent] = useState<string>(() => getInitialValue('savedContent', '') as string);
  const [selectedCenters, setSelectedCenters] = useState<string[]>(() => getInitialValue('savedCenters', []) as string[]);
  const [centerSearch, setCenterSearch] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const handleTypeChange = (type: NoticeType) => {
    setNoticeType(type);
    
    // 이미 본문을 작성 중인 상태라면 덮어쓸지 확인 거치기 (실수 방지 안전장치)
    if (content.trim().length > 0) {
      if (confirm('유형을 변경하면 작성 중인 본문 내용이 선택한 템플릿으로 대체됩니다. 변경하시겠습니까?')) {
        setContent(NOTICE_TEMPLATES[type]);
      }
    } else {
      setContent(NOTICE_TEMPLATES[type]);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const dataToSave = { savedTitle: title, savedContent: content, savedCenters: selectedCenters };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [title, content, selectedCenters, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title || content || selectedCenters.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [title, content, selectedCenters, isOpen]);

  const filteredCenters = DUMMY_CENTERS.filter(c => c.name.includes(centerSearch));
  const isAllSelected = selectedCenters.length === DUMMY_CENTERS.length;
  
  const handleAllCentersToggle = () => {
    setSelectedCenters(isAllSelected ? [] : DUMMY_CENTERS.map(c => c.id));
  };

  const handleCenterToggle = (id: string) => {
    setSelectedCenters(selectedCenters.includes(id) ? selectedCenters.filter(c => c !== id) : [...selectedCenters, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCenters.length === 0) return alert('대상 센터를 선택하세요.');
    
    // 💡 2. 전송 데이터에 user.name(또는 id)을 명시해서 백엔드로 쏩니다.
    console.log({ 
      title, 
      content, 
      selectedCenters, 
      attachedFile,
      author: user?.name || 'Unknown Admin' // 로그인 정보가 비어있을 때를 대비한 널 병합
    });
    
    alert('공지사항이 등록되었습니다.');

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setTitle(''); setContent(''); setSelectedCenters([]); setAttachedFile(null);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => {
          setIsOpen(true)
          if (content.trim().length === 0) {
            setContent(NOTICE_TEMPLATES[noticeType]);
          }
        }} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition cursor-pointer"
      >
        공지사항 작성
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form 
            onSubmit={handleSubmit}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">공지사항 등록</h2>
            </div>

            {/* 💡 3. 작성자 표시 영역 추가 (수정 불가 구조) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">작성자</label>
              <input
                type="text"
                value={user?.name || '로그인 정보 없음'}
                disabled // 👈 사용자가 임의로 이름을 바꾸지 못하도록 비활성화
                className="w-full max-w-xs border border-gray-200 bg-gray-50 text-gray-500 rounded-lg p-2.5 font-medium outline-none cursor-not-allowed text-sm shadow-inner"
              />
            </div>
            {/* 유형 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">공지사항 유형선택</label>
              <div className="flex gap-2">
                {(Object.keys(NOTICE_TYPE_LABELS) as NoticeType[]).map((type) => {
                  const isSelected = noticeType === type;
                  return (
                    <button
                      key={type}
                      type="button" // submit 방지
                      onClick={() => handleTypeChange(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {NOTICE_TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* 제목 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">공지사항 제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요."
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 font-medium"
                required
              />
            </div>

            {/* 센터 선택 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">대상 센터 선택</label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 space-y-4">
                <input
                  type="text"
                  value={centerSearch}
                  onChange={(e) => setCenterSearch(e.target.value)}
                  placeholder="🔍 센터 이름을 검색하세요..."
                  className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none bg-white focus:border-blue-500"
                />
                <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-gray-200/60 text-sm">
                  <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer bg-white border px-3 py-1.5 rounded-md shadow-sm">
                    <input type="checkbox" checked={isAllSelected} onChange={handleAllCentersToggle} className="w-4 h-4 accent-blue-600" />
                    전체
                  </label>
                  {filteredCenters.map((center) => (
                    <label key={center.id} className={`flex items-center gap-2 cursor-pointer border px-3 py-1.5 rounded-md transition-colors ${selectedCenters.includes(center.id) ? 'bg-blue-50 border-blue-200 font-medium text-blue-900' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                      <input type="checkbox" checked={selectedCenters.includes(center.id)} onChange={() => handleCenterToggle(center.id)} className="w-4 h-4 accent-blue-600" />
                      {center.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 본문 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">공지 내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="공지내용을 입력하세요."
                rows={12}
                className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>

            {/* 첨부 파일 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">첨부파일</label>
              <div className="flex items-center gap-4">
                <input type="file" id="file-upload" onChange={(e) => e.target.files && setAttachedFile(e.target.files[0])} className="hidden" />
                <label htmlFor="file-upload" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-4 py-2.5 rounded-lg border border-gray-300 cursor-pointer shadow-sm">파일 선택</label>
                <span className="text-sm text-gray-500 truncate max-w-md">{attachedFile ? attachedFile.name : '선택된 파일이 없습니다.'}</span>
              </div>
            </div>

            {/* 하단 버튼 제어 */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  if(confirm('작성 중인 내용을 지우고 취소하시겠습니까?')) {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    setTitle(''); setContent(''); setSelectedCenters([]); setAttachedFile(null);
                    setIsOpen(false);
                  }
                }}
                className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-lg border border-gray-300 transition cursor-pointer"
              >
                작성 취소
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow transition cursor-pointer"
              >
                공지사항 등록
              </button>
            </div>

          </form>
        </div>
      )}
    </>
  );
}