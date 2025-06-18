// Các hằng số mặc định dùng chung cho việc tạo câu hỏi từng Part
// Tất cả comment bằng tiếng Việt để thành viên dễ hiểu

// ------------------------
// Mảng đáp án rỗng cơ bản (A→D)
// ------------------------
export const emptyChoices = ['A', 'B', 'C', 'D'].map((c) => ({
    ky_tu_lua_chon: c,
    noi_dung: '',
}));

// ------------------------
// Part 6: 4 câu cố định
// ------------------------
export const defaultPart6Questions = Array(4).fill(0).map(() => ({
    noi_dung: '',
    dap_an_dung: '',
    giai_thich: '',
    lua_chon: [...emptyChoices],
}));

// ------------------------
// Part 7: 1 câu – có thể nhân bản thêm
// ------------------------
export const defaultPart7Question = {
    noi_dung: '',
    dap_an_dung: '',
    giai_thich: '',
    lua_chon: [...emptyChoices],
};
