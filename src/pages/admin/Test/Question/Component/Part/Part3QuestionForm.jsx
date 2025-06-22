// Part3QuestionForm.jsx (refactored for edit & create mode)
import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';


import classNames from 'classnames/bind';
import { getAllQuestion } from '@/services/questionService';
import styles from '../CreateQuestionBank.module.scss';

const cx = classNames.bind(styles);

function Part3QuestionForm({
    // Props for legacy create mode (kept for backward compatibility)
    formData,
    setFormData,
    questions,
    onChangeQuestion,
    imagePreview,
    handleImageChange,
    removeImage,
    formatFileSize,
    audioPreview,
    handleAudioChange,
    removeAudio,
    audio,
    // New props for edit mode
    defaultValues = {},
    mode = 'create',
    onSubmit,
    loading,
}) {

    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [partOptions, setPartOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const res = await getAllQuestion(1, {});
                setDifficultyOptions(
                    (res.data?.dsMucDoKho || []).map((item) => ({
                        value: item,
                        label: item === 'de' ? 'Dễ' : item === 'trung_binh' ? 'Trung bình' : item === 'kho' ? 'Khó' : item,
                    })),
                );
                setStatusOptions(
                    (res.data?.dsTrangThai || []).map((item) => ({
                        value: item,
                        label: item === 'da_xuat_ban' ? 'Đã xuất bản' : item === 'luu_tru' ? 'Lưu trữ' : item,
                    })),
                );
                setPartOptions((res.data?.dsPhan || []).map((item) => ({ value: item.id_phan, label: item.ten_phan })));
            } catch (e) {
                setDifficultyOptions([]);
                setStatusOptions([]);
                setPartOptions([]);
            }
        }
        fetchOptions();
    }, []);

    /* ------------------------------------------------------------ */
    /* EDIT MODE IMPLEMENTATION                                     */
    /* ------------------------------------------------------------ */
    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
    } = useForm({
        defaultValues: mode === 'edit' ? {
            phan: String(defaultValues?.phan?.id_phan || ''),
            muc_do_kho: defaultValues?.muc_do_kho || '',
            trang_thai: defaultValues?.trang_thai || '',
            hinh_anh: null,
            am_thanh: null,
            cau_hoi: (defaultValues?.cau_hoi || defaultValues?.ds_cau_hoi || []).map((q) => ({
                noi_dung: q.noi_dung || '',
                dap_an_dung: q.dap_an_dung || 'A',
                giai_thich: q.giai_thich || '',
                lua_chon: (q.lua_chon || []).map((lc) => ({ noi_dung: lc.noi_dung })),
            })),
        } : {},
    });

    const { fields: questionFields, append, update } = useFieldArray({ control, name: 'cau_hoi' });

    // preview states
    const [imagePreviewEdit, setImagePreviewEdit] = useState(
        defaultValues?.hinh_anh_url || defaultValues?.hinh_anh || defaultValues?.file_hinh_anh || '',
    );
    const [audioPreviewEdit, setAudioPreviewEdit] = useState(
        defaultValues?.am_thanh_url || defaultValues?.am_thanh || defaultValues?.file_am_thanh || '',
    );

    const handleImageInput = (e) => {
        const file = e.target.files?.[0];
        setValue('hinh_anh', file);
        if (file) setImagePreviewEdit(URL.createObjectURL(file));
    };

    const handleAudioInput = (e) => {
        const file = e.target.files?.[0];
        setValue('am_thanh', file);
        if (file) setAudioPreviewEdit(URL.createObjectURL(file));
    };

    const submit = (values) => {
        if (typeof onSubmit === 'function') onSubmit(values);
    };

    /* ------------------------------------------------------------ */
    /* RENDER                                                      */
    /* ------------------------------------------------------------ */
    if (mode === 'edit') {
        return (
            <form onSubmit={handleSubmit(submit)}>
                {/* Phần, Độ khó, Trạng thái */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Phần</label>
                        <Controller
                            control={control}
                            name="phan"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={partOptions.map((o) => ({ ...o, value: String(o.value) }))}
                                    value={partOptions
                                        .map((o) => ({ ...o, value: String(o.value) }))
                                        .find((o) => o.value === String(field.value))}
                                    isDisabled
                                />
                            )}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Độ khó</label>
                        <Controller
                            control={control}
                            name="muc_do_kho"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={difficultyOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={difficultyOptions.find((o) => o.value === field.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Trạng thái</label>
                        <Controller
                            control={control}
                            name="trang_thai"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={statusOptions}
                                    onChange={(val) => field.onChange(val?.value)}
                                    value={statusOptions.find((o) => o.value === field.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Image input */}
                <div className="mb-3">
                    <label className="form-label">Hình ảnh (tùy chọn)</label>
                    <input className="form-control" type="file" accept="image/*" onChange={handleImageInput} />
                </div>
                {imagePreviewEdit && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <img
                            src={imagePreviewEdit}
                            alt="preview"
                            className="img-thumbnail"
                            style={{ maxWidth: '240px', objectFit: 'contain' }}
                        />
                    </div>
                )}

                {/* Audio input */}
                <div className="mb-3">
                    <label className="form-label">Âm thanh (bắt buộc)</label>
                    <input className="form-control" type="file" accept="audio/*" onChange={handleAudioInput} />
                </div>
                {audioPreviewEdit && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                            <source src={audioPreviewEdit} />
                        </audio>
                    </div>
                )}

                {/* Loop through 3 questions */}
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
                                        onChange={(e, editor) => field.onChange(editor.getData())}
                                    />
                                )}
                            />
                        </div>

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
                                    render={({ field }) => (
                                        <input type="text" className="form-control" {...field} />
                                    )}
                                />
                            </div>
                        ))}

                        {/* Giải thích */}
                        <div className="mb-3">
                            <label className="form-label">Giải thích</label>
                            <Controller
                                control={control}
                                name={`cau_hoi.${idx}.giai_thich`}
                                render={({ field }) => (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={field.value}
                                        onChange={(e, editor) => field.onChange(editor.getData())}
                                    />
                                )}
                            />
                        </div>
                    </div>
                ))}

                <div className="text-end">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : null}
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
                    <i className="fas fa-info-circle"></i> Yêu cầu Part 3:
                </h6>
                <ul className={cx('requirement-list')}>
                    <li>Tùy chọn có hình ảnh (tùy đề)</li>
                    <li>Bắt buộc có file âm thanh (đoạn hội thoại)</li>
                </ul>
            </div>

            <div className="mb-3">
                <label htmlFor="questionImage" className="form-label">
                    Hình ảnh (Tùy chọn)
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="questionImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <p className="mb-0 fw-medium">{formData.image?.name}</p>
                                <small className="text-muted">{formatFileSize(formData.image?.size)}</small>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                />
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-danger ms-3" onClick={removeImage}>
                                Xóa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-3" id="audioSection">
                <label htmlFor="questionAudio" className="form-label">
                    Âm thanh (Bắt buộc cho part 3)
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
                                <p className="mb-0 fw-medium">{audio?.name}</p>
                                <small className="text-muted">{formatFileSize(audio?.size)}</small>
                            </div>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={removeAudio}>
                            <i className="fas fa-trash-alt me-1"></i>Xóa
                        </button>
                    </div>
                    <div className="mt-3">
                        <audio controls className="w-100" style={{ maxWidth: '400px' }}>
                            <source src={audioPreview} />
                            Trình duyệt của bạn không hỗ trợ phát audio.
                        </audio>
                    </div>
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
                            onChange={(event, editor) => onChangeQuestion(idx, 'noi_dung', editor.getData())}
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

                    {/* Giải thích */}
                    <div className="mb-3">
                        <label className="form-label">Giải thích</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={q.giai_thich}
                            onChange={(event, editor) => onChangeQuestion(idx, 'giai_thich', editor.getData())}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

export default Part3QuestionForm;
