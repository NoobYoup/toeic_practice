import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part4QuestionForm({
    questions,
    onChangeQuestion,
    audioPreview,
    handleAudioChange,
    removeAudio,
    formatFileSize,
    // New props for edit mode
    defaultValues = {},
    mode = 'create',
    onSubmit,
    loading,
}) {
    // -------------------- EDIT MODE --------------------
    const [audioPreviewEdit, setAudioPreviewEdit] = useState(defaultValues?.am_thanh?.url_phuong_tien);
    const { control, handleSubmit, setValue } = useForm({
        defaultValues:
            mode === 'edit'
                ? {
                      am_thanh: null,
                      cau_hoi: (defaultValues?.cau_hoi || defaultValues?.ds_cau_hoi || []).map((q) => ({
                          noi_dung: q.noi_dung || '',
                          dap_an_dung: q.dap_an_dung || 'A',
                          giai_thich: q.giai_thich || '',
                          lua_chon: (q.lua_chon || []).map((lc) => ({ noi_dung: lc.noi_dung })),
                      })),
                  }
                : {},
    });
    const { fields: questionFields } = useFieldArray({ control, name: 'cau_hoi' });

    const handleAudioInput = (e) => {
        const file = e.target.files?.[0];
        setValue('am_thanh', file);
        if (file) setAudioPreviewEdit(URL.createObjectURL(file));
    };

    const submit = (values) => {
        if (typeof onSubmit === 'function') onSubmit(values);
    };

    if (mode === 'edit') {
        return (
            <form onSubmit={handleSubmit(submit)}>
                <div className={cx('requirement-info')}>
                    <h6>
                        <i className="fas fa-info-circle"></i> Yêu cầu Part 4:
                    </h6>
                    <ul className={cx('requirement-list')}>
                        <li>Bắt buộc có file âm thanh (đoạn hội thoại ngắn)</li>
                    </ul>
                </div>
                {/* Upload audio chung */}
                <div className="mb-3" id="audioSection">
                    <label htmlFor="questionAudio" className="form-label">
                        File âm thanh (cho Part 4)
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="questionAudio"
                        accept="audio/*"
                        onChange={handleAudioInput}
                    />
                </div>
                {audioPreviewEdit && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <div className="d-flex align-items-center">
                            <div
                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <i className="fas fa-music text-success"></i>
                            </div>
                            <div>
                                <p className="mb-0 fw-medium">
                                    {defaultValues?.am_thanh?.ten_file || 'Audio đã tải lên'}
                                </p>
                            </div>
                        </div>
                        <audio controls className="w-100 mt-3" style={{ maxWidth: '400px' }}>
                            <source src={audioPreviewEdit} />
                        </audio>
                    </div>
                )}
                {/* Render 3 câu hỏi */}
                {questionFields.map((q, idx) => (
                    <div key={q.id} className="border rounded p-3 mb-4">
                        <h6>Câu {idx + 1}</h6>
                        <div className="mb-3">
                            <label className="form-label">Nội dung</label>
                            <Controller
                                control={control}
                                name={`cau_hoi.${idx}.noi_dung`}
                                render={({ field }) => (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={field.value}
                                        onChange={(_, editor) => field.onChange(editor.getData())}
                                    />
                                )}
                            />
                        </div>
                        {/* Lựa chọn và chọn đáp án */}
                        {['A', 'B', 'C', 'D'].map((option, opIdx) => (
                            <div className="mb-3" key={option}>
                                <Controller
                                    control={control}
                                    name={`cau_hoi.${idx}.dap_an_dung`}
                                    render={({ field }) => (
                                        <input
                                            type="radio"
                                            className="form-check-input me-2"
                                            id={`q${idx}-option${option}`}
                                            value={option}
                                            checked={field.value === option}
                                            onChange={() => field.onChange(option)}
                                        />
                                    )}
                                />
                                <label htmlFor={`q${idx}-option${option}`} className="form-label">
                                    Lựa chọn {option}
                                </label>
                                <Controller
                                    control={control}
                                    name={`cau_hoi.${idx}.lua_chon.${opIdx}.noi_dung`}
                                    render={({ field }) => <input type="text" className="form-control" {...field} />}
                                />
                            </div>
                        ))}
                        <div className="mb-3">
                            <label className="form-label">Giải thích</label>
                            <Controller
                                control={control}
                                name={`cau_hoi.${idx}.giai_thich`}
                                render={({ field }) => (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={field.value}
                                        onChange={(_, editor) => field.onChange(editor.getData())}
                                    />
                                )}
                            />
                        </div>
                    </div>
                ))}
                <div className="text-end">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        );
    }

    // -------------------- CREATE MODE (legacy) --------------------
    if (!Array.isArray(questions)) return null;

    return (
        <>
            <div className={cx('requirement-info')}>
                <h6>
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 4:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Bắt buộc có file âm thanh (đoạn hội thoại ngắn)</li>
                </ul>
            </div>

            {/* Upload audio chung */}
            <div className="mb-3" id="audioSection">
                <label htmlFor="questionAudio" className="form-label">
                    File âm thanh (cho Part 4)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionAudio"
                    accept="audio/*"
                    onChange={handleAudioChange}
                />
            </div>

            {audioPreview && (
                <div className="mb-3 p-3 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div
                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '32px', height: '32px' }}
                            >
                                <i className="fas fa-music text-success"></i>
                            </div>
                            <div>
                                <p className="mb-0 fw-medium">{questions[0].audio?.name}</p>
                                <small className="text-muted">{formatFileSize(questions[0].audio?.size)}</small>
                            </div>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeAudio}>
                            <i className="fas fa-trash-alt me-1"></i>Xóa
                        </button>
                    </div>
                    <audio controls className="w-100 mt-3" style={{ maxWidth: '400px' }}>
                        <source src={audioPreview} />
                    </audio>
                </div>
            )}

            {/* Render 3 câu hỏi */}
            {questions.map((q, idx) => (
                <div key={idx} className="border rounded p-3 mb-4">
                    <h6>Câu {idx + 1}</h6>

                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.noi_dung}
                            onChange={(_, ed) => onChangeQuestion(idx, 'noi_dung', ed.getData())}
                        />
                    </div>

                    {/* Lựa chọn và chọn đáp án */}
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

export default Part4QuestionForm;
