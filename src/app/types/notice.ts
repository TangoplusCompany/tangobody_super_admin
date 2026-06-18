export type NoticeType = 'EMERGENCY' | 'GENERAL' | 'FEATURE' | 'PROMOTION';
export interface INoticeMeta {
  idx: 0 | 1 | 2 | 3;
  key: NoticeType;
  label: string;
}
export const NOTICE_TYPE_LIST: INoticeMeta[] = [
  { idx: 0, key: 'EMERGENCY', label: '🚨 긴급 오류 수정' },
  { idx: 1, key: 'GENERAL',   label: '📢 일반 공지' },
  { idx: 2, key: 'FEATURE',   label: '✨ 새로운 기능' },
  { idx: 3, key: 'PROMOTION', label: '🎁 홍보' },
];
// 1. 공지사항 데이터 타입 정의
export interface INoticeItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  notice_type: 0 | 1 | 2 | 3;
}

