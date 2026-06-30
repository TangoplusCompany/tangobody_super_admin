'use client';

import React from 'react';

// 개별 컬럼의 구조를 정의하는 타입
export interface Column<T> {
  header: string;                                   // 테이블 상단에 노출될 이름
  accessor: keyof T | ((item: T) => React.ReactNode); // 데이터의 키값 또는 커스텀 렌더링 함수
}

interface DataListProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;                   // 행 클릭 이벤트 (상세보기 등)
}

export default function DataList<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
}: DataListProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-sm text-gray-600">
        
        {/* 테이블 헤더 */}
        <thead className="bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-3.5 px-6 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* 테이블 바디 */}
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-10 text-center text-gray-400 font-medium">
                데이터가 존재하지 않습니다.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-4 px-6 whitespace-nowrap">
                    {/* accessor가 함수면 함수 실행(커스텀 UI용), 키값이면 문자열 출력 */}
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}