export const emptyChoices = ['A', 'B', 'C', 'D'].map((c) => ({
    ky_tu_lua_chon: c,
    noi_dung: '',
}));

export const defaultPart6Questions = Array(4)
    .fill(0)
    .map(() => ({
        noi_dung: '',
        dap_an_dung: '',
        giai_thich: '',
        lua_chon: [...emptyChoices],
    }));

export const defaultPart7Question = {
    noi_dung: '',
    dap_an_dung: '',
    giai_thich: '',
    lua_chon: [...emptyChoices],
};
