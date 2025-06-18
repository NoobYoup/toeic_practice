export const QUESTION_PART = { 1: 'part1', 2: 'part2', 3: 'part3', 4: 'part4', 5: 'part5', 6: 'part6', 7: 'part7' };
export const QUESTION_STATUS = { PUBLISHED: 'da_xuat_ban', ARCHIVED: 'luu_tru' };
export const getStatusLabel = (code) =>
    ({ da_xuat_ban: 'Đã xuất bản', luu_tru: 'Lưu trữ' }[code] || code);