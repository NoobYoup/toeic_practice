import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllPassage } from '@/services/passageService';
import { toast } from 'react-toastify';

function Part7QuestionForm({
    formData,
    setFormData,
    questions = [],
    onChangeQuestion,
    onAddQuestion,
    onRemoveQuestion,
}) {
    const [passageOptions, setPassageOptions] = useState([]);

    // Lấy danh sách đoạn văn cho Part 7
    useEffect(() => {
        async function fetchPassages() {
            try {
                const res = await getAllPassage(1); // điều chỉnh tham số tùy API
                const passages = res?.data?.data || res?.data?.passages || [];
                const options = passages.map((p) => ({
                    value: String(p.id_doan_van),
                    label: `[${p.id_doan_van}] ${p.tieu_de}`,
                }));
                setPassageOptions(options);
            } catch (err) {
                console.error('Không thể lấy danh sách đoạn văn:', err);
                setPassageOptions([]);
            }
        }
        fetchPassages();
    }, []);

    const defaultQuestion = {
        noi_dung: '',
        dap_an_dung: '',
        giai_thich: '',
        lua_chon: [
            { ky_tu_lua_chon: 'A', noi_dung: '' },
            { ky_tu_lua_chon: 'B', noi_dung: '' },
            { ky_tu_lua_chon: 'C', noi_dung: '' },
            { ky_tu_lua_chon: 'D', noi_dung: '' },
        ],
    };

    // Hàm thêm câu hỏi với giới hạn tối đa 5
    const handleAddQuestion = () => {
        if (questions.length >= 5) {
            toast.warning('Chỉ được thêm tối đa 5 câu hỏi', { toastId: 'max-questions' });
            return;
        }
        onAddQuestion(defaultQuestion);
    };

    return (
        <>
            {/* Passage selector */}
            <div className="col-md-4 mb-3">
                <label className="form-label">Đoạn văn</label>
                <Select
                    options={passageOptions}
                    value={
                        passageOptions.find((opt) => String(opt.value) === String(formData?.id_doan_van)) || null
                    }
                    onChange={(selected) => {
                        if (setFormData) {
                            setFormData({ ...formData, id_doan_van: selected.value });
                        }
                    }}
                />
            </div>

            {questions.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Câu {idx + 1}</h6>
                        {questions.length > 1 && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onRemoveQuestion(idx)}
                            >
                                Xóa
                            </button>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.noi_dung}
                            onChange={(_, ed) => onChangeQuestion(idx, 'noi_dung', ed.getData())}
                        />
                    </div>

                    {['A', 'B', 'C', 'D'].map((option, index) => (
                        <div className="mb-3" key={option}>
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id={`q${idx}-option${option}`}
                                name={`answerOption${idx}`}
                                value={option}
                                checked={q.dap_an_dung === option}
                                onChange={(e) => onChangeQuestion(idx, 'dap_an_dung', e.target.value)}
                            />
                            <label htmlFor={`q${idx}-option${option}`} className="form-label">
                                Lựa chọn {option}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={`q${idx}-option${option}-input`}
                                value={q.lua_chon[index].noi_dung}
                                onChange={(e) => {
                                    const updatedOptions = [...q.lua_chon];
                                    updatedOptions[index].noi_dung = e.target.value;
                                    onChangeQuestion(idx, 'lua_chon', updatedOptions);
                                }}
                            />
                        </div>
                    ))}

                    <div className="mb-3">
                        <label className="form-label">Giải thích</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.giai_thich}
                            onChange={(_, ed) => onChangeQuestion(idx, 'giai_thich', ed.getData())}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleAddQuestion}
                disabled={questions.length >= 5}
            >
                Thêm câu hỏi
            </button>
        </>
    );
}

export default Part7QuestionForm;
