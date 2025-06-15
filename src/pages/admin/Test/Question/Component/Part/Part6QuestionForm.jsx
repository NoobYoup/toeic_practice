// Part6QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllPassage } from '@/services/passageService';

function Part6QuestionForm({ formData, setFormData, questions, onChangeQuestion, onResetQuestions }) {
    // const [currentPassage, setCurrentPassage] = useState(''); // Remove local state, use formData.id_doan_van instead
    const [passageOptions, setPassageOptions] = useState([]);

    // Lấy danh sách đoạn văn cho Part 6/7
    useEffect(() => {
        async function fetchPassages() {
            try {
                const res = await getAllPassage(1);
                const passages = res?.data?.data || res?.data?.passages || [];
                const options = passages.map((p) => ({
                    value: String(p.id_doan_van),
                    label: `[${p.id_doan_van}] ${p.tieu_de}`,
                }));
                console.log('passageOptions:', options);
                console.log('formData.id_doan_van:', formData?.id_doan_van);
                console.log(
                    'value for Select:',
                    passageOptions.find((option) => option.value === String(formData?.id_doan_van)),
                );
                setPassageOptions(options);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Không thể lấy danh sách đoạn văn:', err);

                setPassageOptions([]);
            }
        }

        fetchPassages();
    }, []);
    return (
        <>
            <div className="col-md-4">
                <label htmlFor="questionPart" className="form-label">
                    Đoạn văn
                </label>
                <Select
                    options={passageOptions}
                    value={
                        passageOptions.find((option) => String(option.value) === String(formData?.id_doan_van)) || null
                    }
                    onChange={(selected) => {
                        // lưu id_doan_van vào formData của cha
                        if (setFormData) {
                            setFormData({ ...formData, id_doan_van: selected.value });
                        }
                        // reset 4 câu hỏi nếu có hàm onResetQuestions
                        if (typeof onResetQuestions === 'function') {
                            onResetQuestions();
                        }
                    }}
                />
            </div>
            {(Array.isArray(questions)
                ? questions
                : Array(4).fill({
                      noi_dung: '',
                      dap_an_dung: '',
                      giai_thich: '',
                      lua_chon: [
                          { ky_tu_lua_chon: 'A', noi_dung: '' },
                          { ky_tu_lua_chon: 'B', noi_dung: '' },
                          { ky_tu_lua_chon: 'C', noi_dung: '' },
                          { ky_tu_lua_chon: 'D', noi_dung: '' },
                      ],
                  })
            ).map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Câu {idx + 1}</h6>
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
        </>
    );
}

export default Part6QuestionForm;
