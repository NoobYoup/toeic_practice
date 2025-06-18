// Part6QuestionForm.jsx
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { memo, useCallback } from 'react';
import usePassageOptions from '@/utils/usePassageOptions';
import ChoiceInput from './ChoiceInput';
import PropTypes from 'prop-types';

function Part6QuestionForm({ formData, setFormData, questions, onChangeQuestion, onResetQuestions }) {
    // Lấy danh sách đoạn văn thông qua hook chung (chỉ gọi API 1 lần)
    const passageOptions = usePassageOptions(); // Lấy danh sách đoạn văn cho Part 6/7

    return (
        <>
            <div className="col-md-4 mb-3">
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

                    {/* Render 4 đáp án A-D bằng component con */}
                    {['A', 'B', 'C', 'D'].map((optionLetter, index) => (
                        <ChoiceInput
                            key={optionLetter}
                            questionIdx={idx}
                            choiceIdx={index}
                            optionLetter={optionLetter}
                            value={q.lua_chon[index].noi_dung}
                            isCorrect={q.dap_an_dung === optionLetter}
                            onTextChange={(val) => {
                                const updatedOptions = [...q.lua_chon];
                                updatedOptions[index].noi_dung = val;
                                onChangeQuestion(idx, 'lua_chon', updatedOptions);
                            }}
                            onChooseCorrect={(letter) => onChangeQuestion(idx, 'dap_an_dung', letter)}
                        />
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

// Memo để tránh re-render không cần thiết khi props không đổi
export default memo(Part6QuestionForm);

Part6QuestionForm.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    onChangeQuestion: PropTypes.func.isRequired,
    onResetQuestions: PropTypes.func,
};
