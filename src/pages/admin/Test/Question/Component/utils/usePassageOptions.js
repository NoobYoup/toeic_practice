// Hook dùng chung để lấy danh sách đoạn văn cho Part 6 & 7
// Giúp tránh gọi API lặp lại ở nhiều component

import { useState, useEffect } from 'react';
import { getAllPassage } from '@/services/passageService';

export default function usePassageOptions() {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await getAllPassage(1);
                const passages = res?.data?.data ?? res?.data?.passages ?? [];
                const opts = passages.map((p) => ({
                    value: String(p.id_doan_van),
                    label: `[${p.id_doan_van}] ${p.tieu_de}`,
                }));
                setOptions(opts);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Lỗi lấy danh sách đoạn văn:', err);
                setOptions([]);
            }
        })();
    }, []);

    return options;
}
